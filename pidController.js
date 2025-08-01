class PIDController {
    constructor(kp = 1.0, ki = 0.1, kd = 0.05) {
        this.kp = kp;  // Proportional gain
        this.ki = ki;  // Integral gain
        this.kd = kd;  // Derivative gain
        
        this.previousError = 0;
        this.integral = 0;
        this.lastTime = 0;
        
        // For tracking PID components
        this.proportionalTerm = 0;
        this.integralTerm = 0;
        this.derivativeTerm = 0;
        
        // Integral windup protection
        this.integralMax = 1000;
        this.integralMin = -1000;
    }
    
    setGains(kp, ki, kd) {
        this.kp = kp;
        this.ki = ki;
        this.kd = kd;
    }
    
    compute(setpoint, processVariable, deltaTime) {
        if (deltaTime <= 0) {
            deltaTime = 0.001; // Prevent division by zero
        }
        
        // Calculate error
        const error = setpoint - processVariable;
        
        // Proportional term
        this.proportionalTerm = this.kp * error;
        
        // Integral term (with windup protection)
        this.integral += error * deltaTime;
        this.integral = Math.max(this.integralMin, Math.min(this.integralMax, this.integral));
        this.integralTerm = this.ki * this.integral;
        
        // Derivative term
        const derivative = (error - this.previousError) / deltaTime;
        this.derivativeTerm = this.kd * derivative;
        
        // Calculate output
        const output = this.proportionalTerm + this.integralTerm + this.derivativeTerm;
        
        // Store error for next iteration
        this.previousError = error;
        
        return {
            output: output,
            error: error,
            proportional: this.proportionalTerm,
            integral: this.integralTerm,
            derivative: this.derivativeTerm
        };
    }
    
    reset() {
        this.previousError = 0;
        this.integral = 0;
        this.proportionalTerm = 0;
        this.integralTerm = 0;
        this.derivativeTerm = 0;
    }
    
    // Get individual PID components for visualization
    getComponents() {
        return {
            proportional: this.proportionalTerm,
            integral: this.integralTerm,
            derivative: this.derivativeTerm
        };
    }
}