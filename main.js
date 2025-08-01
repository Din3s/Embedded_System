// Global variables
let pidController;
let motorSimulation;
let isRunning = false;
let animationId;
let lastTime = 0;

// Chart variables
let speedChart;
let pidChart;
let timeData = [];
let speedData = [];
let targetSpeedData = [];
let proportionalData = [];
let integralData = [];
let derivativeData = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeControllers();
    initializeCharts();
    setupEventListeners();
    updateAllDisplays();
});

function initializeControllers() {
    pidController = new PIDController(1.0, 0.1, 0.05);
    motorSimulation = new MotorSimulation(1.0, 0.1);
}

function initializeCharts() {
    // Speed chart
    const speedCtx = document.getElementById('speedChart').getContext('2d');
    speedChart = new Chart(speedCtx, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [
                {
                    label: 'Current Speed',
                    data: speedData,
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Target Speed',
                    data: targetSpeedData,
                    borderColor: '#4ecdc4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (s)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Speed (RPM)'
                    },
                    min: 0,
                    max: 120
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });

    // PID components chart
    const pidCtx = document.getElementById('pidChart').getContext('2d');
    pidChart = new Chart(pidCtx, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [
                {
                    label: 'Proportional',
                    data: proportionalData,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Integral',
                    data: integralData,
                    borderColor: '#f093fb',
                    backgroundColor: 'rgba(240, 147, 251, 0.1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Derivative',
                    data: derivativeData,
                    borderColor: '#f6d365',
                    backgroundColor: 'rgba(246, 211, 101, 0.1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (s)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'PID Component Value'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

function setupEventListeners() {
    // Control buttons
    document.getElementById('startBtn').addEventListener('click', startSimulation);
    document.getElementById('stopBtn').addEventListener('click', stopSimulation);
    document.getElementById('resetBtn').addEventListener('click', resetSimulation);

    // Parameter sliders
    document.getElementById('targetSpeed').addEventListener('input', updateTargetSpeed);
    document.getElementById('kp').addEventListener('input', updatePIDParameters);
    document.getElementById('ki').addEventListener('input', updatePIDParameters);
    document.getElementById('kd').addEventListener('input', updatePIDParameters);
    document.getElementById('inertia').addEventListener('input', updateMotorParameters);
    document.getElementById('friction').addEventListener('input', updateMotorParameters);

    // Add some keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case ' ':
                event.preventDefault();
                if (isRunning) {
                    stopSimulation();
                } else {
                    startSimulation();
                }
                break;
            case 'r':
                resetSimulation();
                break;
        }
    });
}

function updateTargetSpeed() {
    const value = document.getElementById('targetSpeed').value;
    document.getElementById('targetSpeedValue').textContent = value;
}

function updatePIDParameters() {
    const kp = parseFloat(document.getElementById('kp').value);
    const ki = parseFloat(document.getElementById('ki').value);
    const kd = parseFloat(document.getElementById('kd').value);
    
    document.getElementById('kpValue').textContent = kp.toFixed(1);
    document.getElementById('kiValue').textContent = ki.toFixed(2);
    document.getElementById('kdValue').textContent = kd.toFixed(2);
    
    pidController.setGains(kp, ki, kd);
}

function updateMotorParameters() {
    const inertia = parseFloat(document.getElementById('inertia').value);
    const friction = parseFloat(document.getElementById('friction').value);
    
    document.getElementById('inertiaValue').textContent = inertia.toFixed(1);
    document.getElementById('frictionValue').textContent = friction.toFixed(2);
    
    motorSimulation.setParameters(inertia, friction);
}

function startSimulation() {
    if (!isRunning) {
        isRunning = true;
        lastTime = performance.now();
        animationLoop();
        
        document.getElementById('startBtn').style.background = '#888';
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
    }
}

function stopSimulation() {
    isRunning = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    document.getElementById('startBtn').style.background = '#4CAF50';
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
}

function resetSimulation() {
    stopSimulation();
    
    // Reset controllers
    pidController.reset();
    motorSimulation.reset();
    
    // Clear chart data
    timeData = [];
    speedData = [];
    targetSpeedData = [];
    proportionalData = [];
    integralData = [];
    derivativeData = [];
    
    speedChart.data.labels = timeData;
    speedChart.data.datasets[0].data = speedData;
    speedChart.data.datasets[1].data = targetSpeedData;
    speedChart.update();
    
    pidChart.data.labels = timeData;
    pidChart.data.datasets[0].data = proportionalData;
    pidChart.data.datasets[1].data = integralData;
    pidChart.data.datasets[2].data = derivativeData;
    pidChart.update();
    
    // Reset displays
    updateAllDisplays();
    
    // Reset motor animation
    document.getElementById('rotor').style.transform = 'rotate(0deg)';
}

function animationLoop(currentTime = 0) {
    if (!isRunning) return;
    
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;
    
    if (deltaTime > 0 && deltaTime < 0.1) { // Reasonable time step
        simulationStep(deltaTime);
    }
    
    animationId = requestAnimationFrame(animationLoop);
}

function simulationStep(deltaTime) {
    // Get current parameters
    const targetSpeed = parseFloat(document.getElementById('targetSpeed').value);
    const currentSpeed = motorSimulation.getCurrentSpeed();
    
    // Compute PID control
    const pidResult = pidController.compute(targetSpeed, currentSpeed, deltaTime);
    
    // Update motor simulation
    const motorResult = motorSimulation.update(pidResult.output, deltaTime);
    
    // Update displays
    updateDisplays(pidResult, motorResult, targetSpeed);
    
    // Update charts (limit data points for performance)
    const currentTime = timeData.length * deltaTime;
    if (timeData.length > 200) {
        timeData.shift();
        speedData.shift();
        targetSpeedData.shift();
        proportionalData.shift();
        integralData.shift();
        derivativeData.shift();
    }
    
    timeData.push(currentTime.toFixed(1));
    speedData.push(currentSpeed.toFixed(1));
    targetSpeedData.push(targetSpeed);
    proportionalData.push(pidResult.proportional.toFixed(2));
    integralData.push(pidResult.integral.toFixed(2));
    derivativeData.push(pidResult.derivative.toFixed(2));
    
    // Update charts every few frames for performance
    if (timeData.length % 3 === 0) {
        speedChart.update('none');
        pidChart.update('none');
    }
    
    // Animate motor rotation
    animateMotor(motorResult.rotationAngle, currentSpeed);
}

function updateDisplays(pidResult, motorResult, targetSpeed) {
    document.getElementById('currentSpeed').textContent = motorResult.speed.toFixed(1);
    document.getElementById('currentSpeedText').textContent = motorResult.speed.toFixed(1);
    document.getElementById('error').textContent = pidResult.error.toFixed(1);
    document.getElementById('controlOutput').textContent = pidResult.output.toFixed(1);
}

function updateAllDisplays() {
    document.getElementById('currentSpeed').textContent = '0.0';
    document.getElementById('currentSpeedText').textContent = '0';
    document.getElementById('error').textContent = '0.0';
    document.getElementById('controlOutput').textContent = '0.0';
}

function animateMotor(angle, speed) {
    const rotor = document.getElementById('rotor');
    rotor.style.transform = `rotate(${angle}deg)`;
    
    // Add visual feedback for speed with color changes
    const speedPercent = Math.min(speed / 100, 1);
    const hue = speedPercent * 120; // Green to red
    rotor.style.filter = `hue-rotate(${hue}deg) brightness(${1 + speedPercent * 0.3})`;
}

// Add some preset PID tuning examples
function loadPreset(preset) {
    let kp, ki, kd;
    
    switch(preset) {
        case 'aggressive':
            kp = 2.5; ki = 0.5; kd = 0.1;
            break;
        case 'conservative':
            kp = 0.5; ki = 0.05; kd = 0.02;
            break;
        case 'oscillating':
            kp = 3.0; ki = 0.8; kd = 0;
            break;
        default:
            kp = 1.0; ki = 0.1; kd = 0.05;
    }
    
    document.getElementById('kp').value = kp;
    document.getElementById('ki').value = ki;
    document.getElementById('kd').value = kd;
    updatePIDParameters();
}

// Add random disturbance for testing
function addDisturbance() {
    if (isRunning) {
        motorSimulation.addDisturbance(15);
    }
}

// Add keyboard shortcuts info
console.log('Keyboard shortcuts:');
console.log('Spacebar: Start/Stop simulation');
console.log('R: Reset simulation');
console.log('Type addDisturbance() to add random disturbance');
console.log('Type loadPreset("aggressive") for aggressive tuning');
console.log('Type loadPreset("conservative") for conservative tuning');