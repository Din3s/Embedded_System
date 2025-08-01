# 🎛️ PID Motor Control Simulator

An interactive web-based simulator for learning PID (Proportional-Integral-Derivative) control through motor speed control. This project provides a hands-on way to understand how PID controllers work and how different parameters affect system response.

## 🚀 Features

- **Real-time PID Control**: Interactive sliders to adjust P, I, and D gains
- **Motor Simulation**: Realistic motor physics with inertia and friction
- **Live Visualization**: Animated motor with real-time speed display
- **Performance Charts**: Track speed response and PID component contributions
- **Educational Content**: Built-in theory explanations
- **Responsive Design**: Works on desktop and mobile devices

## 📦 Quick Start

1. **Clone or download** this project
2. **Open terminal** in the project directory
3. **Install dependencies** (optional, for development server):
   ```bash
   npm install
   ```
4. **Start the application**:
   ```bash
   # Option 1: Simple HTTP server
   npm start
   
   # Option 2: Development server with live reload
   npm run dev
   
   # Option 3: Direct file opening
   # Simply open index.html in your web browser
   ```

## 🎯 How to Use

### Basic Operation
1. Set your desired **Target Speed** using the slider
2. Adjust **PID parameters** (Kp, Ki, Kd) to control system response
3. Modify **Motor parameters** (Inertia, Friction) to change system characteristics
4. Click **Start** to begin the simulation
5. Observe the motor animation and charts

### Understanding PID Parameters

#### Proportional (Kp)
- **Effect**: Immediate response to current error
- **High values**: Faster response, but may cause overshoot
- **Low values**: Slower response, less overshoot
- **Start with**: 1.0

#### Integral (Ki)
- **Effect**: Eliminates steady-state error
- **High values**: Faster elimination of steady-state error, but may cause oscillation
- **Low values**: Slower steady-state error correction
- **Start with**: 0.1

#### Derivative (Kd)
- **Effect**: Responds to rate of change of error
- **High values**: Reduces overshoot, improves stability
- **Low values**: Less dampening effect
- **Start with**: 0.05

### Tuning Guide

1. **Start with P only**: Set Ki=0, Kd=0, adjust Kp until you get reasonable response
2. **Add I term**: Gradually increase Ki to eliminate steady-state error
3. **Add D term**: Increase Kd to reduce overshoot and improve stability
4. **Fine-tune**: Make small adjustments while observing the response

### Common Response Types

- **Sluggish**: Increase Kp
- **Oscillating**: Reduce Kp or increase Kd
- **Overshoot**: Increase Kd or reduce Kp
- **Steady-state error**: Increase Ki

## 🛠️ Technical Details

### Architecture
- **Pure JavaScript**: No frameworks, runs in any modern browser
- **Modular Design**: Separate classes for PID controller and motor simulation
- **Real-time Animation**: Uses requestAnimationFrame for smooth updates
- **Chart.js**: For real-time data visualization

### Files Structure
```
├── index.html          # Main HTML structure
├── styles.css          # Responsive styling and animations
├── pidController.js    # PID controller implementation
├── motorSimulation.js  # Motor physics simulation
├── main.js            # Main application logic
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

### PID Implementation
The PID controller uses the standard discrete-time algorithm:
```
output = Kp×error + Ki×∫error×dt + Kd×(derror/dt)
```

### Motor Physics
The motor simulation includes:
- **Inertia**: Resistance to speed changes
- **Friction**: Speed-dependent resistance
- **Load torque**: Constant opposing force
- **Noise**: Realistic disturbances

## 🎮 Interactive Features

### Keyboard Shortcuts
- **Spacebar**: Start/Stop simulation
- **R**: Reset simulation

### Console Commands
Open browser console and try:
```javascript
addDisturbance()                    // Add random disturbance
loadPreset("aggressive")           // Load aggressive PID settings
loadPreset("conservative")         // Load conservative PID settings
loadPreset("oscillating")          // Load oscillating PID settings
```

## 📚 Learning Objectives

After using this simulator, you should understand:

1. **PID Fundamentals**: How P, I, and D terms affect control response
2. **Tuning Process**: Systematic approach to PID parameter selection
3. **System Dynamics**: How motor characteristics affect control difficulty
4. **Real-world Applications**: Where PID control is used in industry

## 🔧 Customization

### Adding New Features
- Modify `motorSimulation.js` to add different motor types
- Update `pidController.js` to implement advanced PID variants
- Extend `main.js` to add new visualization options

### Preset Configurations
Add your own PID presets by modifying the `loadPreset()` function in `main.js`.

## 🌐 Browser Compatibility

- Chrome/Edge: Fully supported
- Firefox: Fully supported  
- Safari: Fully supported
- Mobile browsers: Responsive design included

## 📖 Further Reading

- [PID Controller Wikipedia](https://en.wikipedia.org/wiki/PID_controller)
- [Control Systems Engineering Textbooks](https://en.wikipedia.org/wiki/Control_theory)
- [Industrial PID Applications](https://en.wikipedia.org/wiki/Process_control)

## 🤝 Contributing

Feel free to:
- Report bugs or suggest features
- Improve the documentation
- Add new simulation features
- Create additional learning materials

## 📄 License

MIT License - feel free to use this for educational purposes!

---

**Happy Learning!** 🎓 Start with the default settings and experiment with different PID parameters to see how they affect the motor's response to speed changes.
