class MotorSimulation {
    constructor(inertia = 1.0, friction = 0.1) {
        this.inertia = inertia;      // Motor inertia (resistance to speed change)
        this.friction = friction;    // Friction coefficient
        this.speed = 0;             // Current angular velocity (RPM)
        this.acceleration = 0;      // Current angular acceleration
        this.position = 0;          // Angular position (degrees)
        
        // Motor characteristics
        this.maxTorque = 100;       // Maximum motor torque
        this.torqueConstant = 0.5;  // Torque per unit input
        
        // Noise simulation
        this.noiseLevel = 0.1;      // Small amount of realistic noise
        
        // For animation
        this.rotationAngle = 0;
    }
    
    setParameters(inertia, friction) {
        this.inertia = Math.max(0.1, inertia);  // Prevent zero inertia
        this.friction = Math.max(0, friction);
    }
    
    update(controlInput, deltaTime) {
        if (deltaTime <= 0) {
            deltaTime = 0.001; // Prevent issues with zero time
        }
        
        // Convert control input to torque
        let appliedTorque = controlInput * this.torqueConstant;
        
        // Limit torque to motor capabilities
        appliedTorque = Math.max(-this.maxTorque, Math.min(this.maxTorque, appliedTorque));
        
        // Calculate friction torque (opposes motion)
        const frictionTorque = -this.friction * this.speed;
        
        // Add some load torque to make it more realistic
        const loadTorque = 0.5; // Constant load
        
        // Net torque
        const netTorque = appliedTorque + frictionTorque - loadTorque;
        
        // Calculate acceleration using Newton's second law for rotation
        // τ = I * α  =>  α = τ / I
        this.acceleration = netTorque / this.inertia;
        
        // Update speed using acceleration
        this.speed += this.acceleration * deltaTime;
        
        // Add realistic noise
        const noise = (Math.random() - 0.5) * this.noiseLevel;
        this.speed += noise;
        
        // Prevent negative speeds for this simulation (motor can't reverse easily)
        this.speed = Math.max(0, this.speed);
        
        // Update position for animation
        this.position += this.speed * deltaTime * 6; // Convert RPM to degrees per second
        this.rotationAngle = this.position % 360;
        
        return {
            speed: this.speed,
            acceleration: this.acceleration,
            position: this.position,
            rotationAngle: this.rotationAngle,
            appliedTorque: appliedTorque,
            netTorque: netTorque
        };
    }
    
    getCurrentSpeed() {
        return this.speed;
    }
    
    getRotationAngle() {
        return this.rotationAngle;
    }
    
    reset() {
        this.speed = 0;
        this.acceleration = 0;
        this.position = 0;
        this.rotationAngle = 0;
    }
    
    // Add disturbance for testing PID response
    addDisturbance(magnitude = 10) {
        this.speed += (Math.random() - 0.5) * magnitude;
        this.speed = Math.max(0, this.speed);
    }
    
    // Simulate step load change
    addLoadDisturbance(loadChange = 5) {
        this.speed -= loadChange;
        this.speed = Math.max(0, this.speed);
    }
}