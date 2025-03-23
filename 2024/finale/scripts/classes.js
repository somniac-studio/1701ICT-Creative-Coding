class Entity {
    constructor(x, y) {
        // Display
        this.color = '#ECF0F1';
        
        // Map boundaries
        this.edgeRadius = 1;
        this.mapBottom = MAP_HEIGHT;
        this.mapLeft = 0;
        this.mapRight = width;
        this.mapTop = 0;

        // Misc
        this.age = 0;
        this.dead = false;
        this.type = 'entity';

        // Physics
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.r = 0;
    }

    // All operations to do per tick
    act() {
        if (!paused) {
            this.cooldown();
            this.update();
            this.borders();
        }
        this.display();
    }

    // Find angle to another entity
    angleTo(e) {
        return atan2(e.pos.y - this.pos.y, e.pos.x - this.pos.x);
    }

    // Border behavior
    borders() {
        // Kill if outside map
        if (this.outsideMap()) {
            this.dead = true;
            return;
        }

        // Behavior when hitting walls
        let x = this.pos.x;
        let y = this.pos.y;
        let r = this.r * this.edgeRadius;
        if (x - r < this.mapLeft) this.onHitLeft();
        if (x + r > this.mapRight) this.onHitRight();
        if (y - r < this.mapTop) this.onHitTop();
        if (y + r > this.mapBottom) this.onHitBottom();
    }

    // Check for hitbox collision with another entity
    collide(e) {
        return this.pos.dist(e.pos) < this.r + e.r;
    }

    // Update cooldowns
    cooldown() {
        this.age += dt();
    }

    // Display on the canvas
    display() {}

    // Any dynamic initialization to do
    init() {}

    // Drawing function
    model() {}

    // Events
    onDeath() {}
    onHitBottom() {}
    onHitLeft() {}
    onHitRight() {}
    onHitTop() {}

    // Check if entity is outside map
    outsideMap() {
        let x = this.pos.x;
        let y = this.pos.y;
        let r = this.r * 2;
        return (x + r < this.mapLeft || x - r > this.mapRight || y + r < this.mapTop || y - r > this.mapBottom);
    }

    // Update physics
    update() {
        this.pos.add(p5.Vector.mult(this.vel, dt()));
    }
}

///////////////////////////////////////////////////////////////

class Ship extends Entity {
    constructor(x, y) {
        super(x, y);

        // Cooldowns
        this.fireTime = 10;

        // Display
        this.boomSize = 32;
        this.boomSpeedMax = 3;
        this.boomSpeedMin = 0;
        this.boomType = PS.explosion;
        this.model = MODEL.ship.basic;

        // Map boundaries
        this.edgeRadius = 2;

        // Misc
        this.type = 'ship';

        // Stats
        this.fireRate = 10;
        this.hp = 0;
        this.speed = 3;
    }

    // The attack being used when firing
    attack() {}

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.fireTime > 0) this.fireTime -= dt();
        if (this.fireTime < 0) this.fireTime = 0;
    }

    // Deal damage
    damage() {
        if (this.hp > 0) {
            this.hp--;
        } else if (!this.dead) {
            this.dead = true;
            this.onKilled();
        }
    }

    // Display on the canvas
    display() {
        this.model();
    }

    // Create explosion particle effect
    explode() {
        addParticleSystem(this.pos.x, this.pos.y, this.boomSpeedMin, this.boomSpeedMax, this.boomSize, this.boomType);
    }

    // Fire weapon
    fire() {
        if (this.fireTime > 0) return;
        this.fireTime = this.fireRate;
        this.attack();
        if(soundOn == 1){
            sfxGunshotB.play();
        }
    }

    // Any dynamic initializations that need to be done
    init() {
        this.maxHp = this.hp;
    }

    // Events
    onKilled() {}
    onHitLeft() {
        this.pos.x = this.mapLeft + this.r * this.edgeRadius;
    }
    onHitRight() {
        this.pos.x = this.mapRight - this.r * this.edgeRadius;
    }
}

///////////////////////////////////////////////////////

class Bullet extends Entity {
    constructor(x, y, angle, speed, fromPlayer) {
        super(x, y);

        // Display
        this.model = MODEL.bullet.basic;

        // Misc
        this.fromPlayer = Boolean(fromPlayer);
        this.maxAge = -1;
        this.type = 'bullet';

        // Physics
        this.acc = 0;
        this.angle = angle;
        this.angVel = 0;
        this.gravX = 0;
        this.gravY = 0;
        this.maxSpeed = 10;
        this.r = 5;
        this.speed = speed;
    }

    // All operations to do per tick
    act() {
        if (!paused) this.ai();
        super.act();
        if (!paused) this.collideShips();
    }

    // Dynamically update behavior
    ai() {}

    // Check for collision with player or enemy ships
    collideShips() {
        if (this.fromPlayer) {
            // Try to hit boss first
            if (boss && !boss.dead && this.tryHit(boss)) return;

            // If that fails, try to hit enemies
            for (let i = 0; i < enemies.length; i++) {
                if (!enemies[i].dead && this.tryHit(enemies[i])) return;
            }
        } else {
            // Try to hit player
            this.tryHit(pl);
        }
    }

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.maxAge !== -1 && this.age >= this.maxAge) {
            this.dead = true;
            this.onOldAge();
        }
    }

    // Display on the canvas
    display() {
        this.model();
    }

    // Any dynamic initializations to do
    init() {
        this.grav = createVector(this.gravX, this.gravY);
    }

    // Events
    onHit(e) {}
    onOldAge() {}

    // Attempt to hit an entity
    tryHit(e) {
        if (this.collide(e)) {
            this.dead = true;
            e.damage();
            this.onHit(e);
            return true;
        }
    }

    // Update physics
    update() {
        // Apply gravity
        this.vel.add(p5.Vector.mult(this.grav, dt()));

        // Apply angular velocity and linear acceleration
        this.angle += this.angVel * dt();
        this.speed += this.acc * dt();

        // Combine gravity velocity vector and other properties
        let v = p5.Vector.fromAngle(radians(this.angle), this.speed);
        v = v.add(this.vel);

        // Constrain to maxSpeed and apply to position
        v.setMag(constrain(v.mag(), -this.maxSpeed, this.maxSpeed) * dt());
        this.pos.add(v);
    }
}


///////////////////////////////////////////////////////////////////


class Item extends Entity {
    constructor(x, y, template) {
        super(x, y);

        // Display
        this.model = MODEL.item.square;
        this.type = 'item';

        // Map boundaries
        this.mapTop = WORLD_CEILING;

        // Physics
        this.fallSpeed = 2;
        this.r = 12;

        applyTemplate(this, template);
        this.init();
    }

    // All operations to do per tick
    act() {
        if (!paused) this.collidePlayer();
        super.act();
    }

    // Check if player is able to pick up
    canPickUp(pl) {
        return true;
    }

    // Check for collision with player
    collidePlayer() {
        if (this.collide(pl) && this.canPickUp(pl)) {
            this.dead = true;
            this.onPickup(pl);
        }
    }

    // Display on the canvas
    display() {
        this.model();
    }

    // Any dynamic initialization to do
    init() {
        this.vel = createVector(0, this.fallSpeed);
    }

    // Events
    onPickup(pl) {}
}


///////////////////////////////////////////////////////////////////

class Player extends Ship {
    constructor(x, y) {
        super(x, y);

        // Cooldowns
        this.invulnTime = 0;

        // Display
        this.color = '#19B5FE';

        // Misc
        this.type = 'player';

        // Physics
        this.r = PLAYER_RADIUS;

        // Stats
        this.fireRate = PLAYER_FIRE_RATE;
        this.hp = PLAYER_HP;
        this.speed = PLAYER_SPEED;
        this.weapon = 'basic';
    }

    // All operations to do per tick
    act() {
        if (!paused) this.controls();
        super.act();
    }

    // The attack being used when firing
    attack() {
        WEAPON[this.weapon](this);
    }

    // Check for keypresses
    controls() {
        // Fire weapon (Z key or B key)
        if (keyIsDown(90) || keyIsDown(66)) this.fire();
        
        // Movement (arrow keys)
        let diag = this.speed / sqrt(2);
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
                this.vel = createVector(diag, -diag);
            } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
                this.vel = createVector(diag, diag);
            } else {
                this.vel = createVector(this.speed, 0);
            }
        } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
                this.vel = createVector(-diag, -diag);
            } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
                this.vel = createVector(-diag, diag);
            } else {
                this.vel = createVector(-this.speed, 0);
            }
        } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
            this.vel = createVector(0, this.speed);
        } else if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            this.vel = createVector(0, -this.speed);
        } else {
            this.vel.mult(0);
        }
    }

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.invulnTime > 0) this.invulnTime -= dt();
        if (this.invulnTime < 0) this.invulnTime = 0;
    }

    // Deal damage
    damage() {
        if (this.invulnTime > 0) return;
        this.invulnTime = INVULN_TIME;
        super.damage();
    }

    // Display on the canvas
    display() {
        this.model(true);
    }

    // Heal HP up to max & make sure it doesn't go over
    heal(amt) {
        if (typeof amt === 'undefined') amt = 1;
        if (this.hp < this.maxHp) this.hp += amt;
        if (this.hp > this.maxHp) this.hp = this.maxHp;
    }

    // Cool Events
    onDeath() {
        resetGame();
    }
    onHitBottom() {
        this.pos.y = this.mapBottom - this.r * this.edgeRadius;
    }
    onHitTop() {
        this.pos.y = this.mapTop + this.r * this.edgeRadius;
    }
}


//////////////////////////////////////////////////////////////////

//used for bad boy boss fight.
class Wall {
    constructor(pos, numSegments, isHorizontal) {
        // Display
        this.amplitude = 10;
        this.color = '#F9B32F';
        this.num = numSegments;
        this.weight = 4;

        // Misc
        this.dead = false;

        // Physics
        this.horizontal = isHorizontal;
        this.pos = pos;
    }

    // All operations to do per tick
    act() {
        this.collidePlayer();
        this.display();
    }

    // Check for collision with player
    collidePlayer() {}

    // Display on the canvas
    display() {
        noFill();
        stroke(this.color);
        strokeWeight(this.weight);
        beginShape();
        for (let i = 0; i < (this.num + 1); i++) {
            let amp = random(-this.amplitude, this.amplitude);
            if (this.horizontal) {
                vertex(width/this.num*i, this.pos + amp);
            } else {
                vertex(this.pos + amp, MAP_HEIGHT/this.num*i);
            }
        }
        endShape();
        strokeWeight(1);
    }

    // Any dynamic initialization to do
    init() {}

    // Events
    onDeath() {}
}

///////////////////////////////////////////////////////////////////

class ParticleSystem extends Entity {
    constructor(x, y, minSpeed, maxSpeed, num, template) {
        super(x, y);

        // Misc
        this.particles = [];
        this.particleTemplate = {};
        this.type = 'particleSystem';

        // Physics
        this.maxSpeed = minSpeed;
        this.minSpeed = maxSpeed;

        applyTemplate(this, template);
        this.init();
        this.addParticle(num);
    }

    // All operations to do per tick
    act() {
        this.cooldown();
        loopOver(this.particles);
    }

    // Spawn a number of particles
    addParticle(num) {
        num = typeof num === 'undefined' ? 1 : num;
        for (let i = 0; i < num; i++) {
            let p = new Particle(this.pos.x, this.pos.y, this.minSpeed, this.maxSpeed);
            applyTemplate(p, this.particleTemplate);
            p.init();
            this.particles.push(p);
        }
    }

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.particles.length === 0) this.dead = true;
    }
}

///////////////////////////////////////////////////////////////////////

class Particle extends Entity {
    constructor(x, y, minSpeed, maxSpeed) {
        super(x, y);

        // Display
        this.color = [236, 240, 241];

        // Misc
        this.decayMax = 4;
        this.decayMin = 2;
        this.lifespan = 255;
        this.type = 'particle';
        
        // Physics
        this.angle = random(360);
        this.angVel = 0;
        this.gravX = 0;
        this.gravY = 0;
        this.rMax = 6;
        this.rMin = 3;
        this.vel = p5.Vector.random2D().mult(random(minSpeed, maxSpeed));
    }

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.lifespan > 0) {
            this.lifespan -= this.decay * dt();
        } else {
            this.dead = true;
        }
    }

    // Display on the canvas
    display() {
        this.model();
    }

    // Any dynamic initialization to do
    init() {
        this.decay = random(this.decayMin, this.decayMax);
        this.grav = createVector(this.gravX, this.gravY);
        this.r = random(this.rMin, this.rMax);
    }

    // Update physics
    update() {
        this.vel.add(p5.Vector.mult(this.grav, dt()));
        super.update();
        this.angle += this.angVel * dt();
    }
}


/////////////////////////////////////////////////////////////////

class Enemy extends Ship {
    constructor(x, y) {
        super(x, y);

        // Map boundaries
        this.mapTop = WORLD_CEILING;

        // Misc
        this.spawnAboveMap = true;
        this.type = 'enemy';

        // Physics
        this.r = 14;

        // Stats
        this.maxSpeed = 3;
        this.minSpeed = 3;
        this.points = 50;
    }

    // All operations to do per tick
    act() {
        if (!paused) {
            this.ai();
            this.collidePlayer();
        }
        super.act();
    }

    // Dynamically update behavior
    ai() {}

    // Damage player if in contact
    collidePlayer() {
        if (this.collide(pl)) pl.damage();
    }

    // Try to drop an item
    dropItem() {
        if (random() < curLevel.dropChance) spawnItem(this.pos.x, this.pos.y);
    }

    // Any dynamic initializations to do
    init() {
        super.init();
        this.speed = random(this.minSpeed, this.maxSpeed);
        this.vel = createVector(0, this.speed);
    }

    // Events
    onKilled() {
        addScore(this.points);
        this.dropItem();
        this.explode();
    }
}

//////////////////////////////////////////////////////////////////

class Boss extends Ship {
    constructor(x, y) {
        super(x, y);

        // AI
        this.nextStage = null;
        this.stage = null;
        this.stages = {};

        // Cooldown
        this.healthCooldown = -1;
        this.nextStageTime = -1;

        // Display
        this.boomSize = 256;
        this.boomSpeedMax = 4;
        this.boomType = PS.confetti;

        // Misc
        this.dropRate = 0.002;
        this.emitters = [];
        this.type = 'boss';

        // Physics
        this.r = 28;

        // Stats
        this.points = 1000;
    }

    // All operations to do per tick
    act() {
        if (!paused) {
            if (this.stage && this.stages[this.stage].ai) {
                this.stages[this.stage].ai(this);
            }
            this.collidePlayer();
            this.spawnItem();
        }
        super.act();
    }

    // Damage player if in contact
    collidePlayer() {
        if (this.collide(pl)) pl.damage();
    }

    // Update all cooldowns
    cooldown() {
        super.cooldown();
        if (this.nextStageTime > 0) this.nextStageTime -= dt();
        if (this.nextStageTime <= 0 && this.nextStageTime > -1) this.switchStage();
    }

    // Deal damage
    damage() {
        super.damage();
        if (this.healthCooldown > 0) this.healthCooldown--;
        if (this.healthCooldown === 0) this.switchStage();
    }

    // Fire weapon
    fire() {
        if (this.fireTime > 0) return;
        this.fireTime = this.fireRate;
        if (this.stage in this.stages && this.stages[this.stage].attack) {
            this.stages[this.stage].attack(this);
        }
    }

    // Any dynamic initialization to do
    init() {
        super.init();
        this.switchStage();
    }

    // Events
    onKilled() {
        addScore(this.points);
        bullets = [];
        loadLevel();
        this.explode();
    }

    // Spawn an item above the map
    spawnItem() {
        if (random() < this.dropRate * dt()) spawnItem();
    }

    // Trigger next stage of boss fight
    switchStage() {
        this.healthCooldown = -1;
        this.nextStageTime = -1;

        // Finish stage
        if (this.stage && this.stages[this.stage] && this.stages[this.stage].finish) {
            this.stages[this.stage].finish(this);
        }

        // Start the next stage
        if (this.nextStage in this.stages) {
            this.stage = this.nextStage;
            let curStage = this.stages[this.stage];
            if (curStage.init) curStage.init(this);

            // Set next stage
            if (Array.isArray(curStage.nextStage)) {
                // Pick random stage from array
                this.nextStage = random(curStage.nextStage);
            } else {
                this.nextStage = curStage.nextStage;
            }

            // Set limits for switching stage
            let t = curStage.timeLimit;
            this.nextStageTime = t ? t : -1;
            let h = curStage.healthLimit;
            if (h) {
                this.healthCooldown = h * this.maxHp;
            }
        } else {
            this.stage = null;
        }
    }
}

