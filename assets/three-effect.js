class HeroCanvas {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouse = { x: 0, y: 0 };
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.isMobile = window.innerWidth < 768;
        
        if (this.isMobile && window.innerWidth < 480) {
            // Desabilitar em telas muito pequenas
            return;
        }
        
        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            3000
        );
        this.camera.position.z = 1000;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: !this.isMobile, // Desabilitar anti-aliasing em mobile
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        
        // Reduzir pixel ratio em mobile para performance
        this.renderer.setPixelRatio(this.isMobile ? 1 : Math.min(window.devicePixelRatio, 2));

        // Particles
        this.createParticles();
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];

        // Reduzir partículas em mobile
        const particleCount = this.isMobile ? 800 : 1500;

        for (let i = 0; i < particleCount; i++) {
            // Position
            vertices.push(
                Math.random() * 2000 - 1000, // x
                Math.random() * 2000 - 1000, // y
                Math.random() * 2000 - 1000  // z
            );

            // Colors (azul suave para combinar com o design)
            const color = new THREE.Color();
            color.setHSL(0.55 + Math.random() * 0.15, 0.6, 0.7);
            colors.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        // Material
        const material = new THREE.PointsMaterial({
            size: this.isMobile ? 2 : 3,
            vertexColors: true,
            transparent: true,
            opacity: this.isMobile ? 0.6 : 0.8,
            sizeAttenuation: true
        });

        // Points
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);

        // Add connecting lines apenas em desktop
        if (!this.isMobile) {
            this.createConnections();
        }
    }

    createConnections() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];

        // Criar algumas linhas conectando partículas próximas
        const positions = this.particles.geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 15) { // Menos linhas para melhor performance
            if (i + 5 < positions.length) {
                // Linha entre duas partículas
                vertices.push(
                    positions[i], positions[i + 1], positions[i + 2],
                    positions[i + 3], positions[i + 4], positions[i + 5]
                );

                // Cores para as linhas
                colors.push(0.4, 0.7, 1.0, 0.4, 0.7, 1.0);
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.15
        });

        const lines = new THREE.LineSegments(geometry, material);
        this.scene.add(lines);
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize(), false);
        
        // Reduzir sensibilidade do mouse em mobile
        const mouseSensitivity = this.isMobile ? 0.5 : 1;
        
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX - this.windowHalfX) * mouseSensitivity;
            this.mouse.y = (event.clientY - this.windowHalfY) * mouseSensitivity;
        }, false);

        // Pausar animação quando a aba não está visível
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimation = true;
            } else {
                this.pauseAnimation = false;
            }
        });
    }

    onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.isMobile = window.innerWidth < 768;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(this.isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    }

    animate() {
        if (this.pauseAnimation) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        requestAnimationFrame(() => this.animate());

        // Rotação suave das partículas
        if (this.particles) {
            this.particles.rotation.x += 0.0003;
            this.particles.rotation.y += this.isMobile ? 0.0005 : 0.0008;

            // Interação com mouse - mais sutil em mobile
            const mouseInfluence = this.isMobile ? 0.02 : 0.05;
            this.camera.position.x += (this.mouse.x - this.camera.position.x) * mouseInfluence;
            this.camera.position.y += (-this.mouse.y - this.camera.position.y) * mouseInfluence;
            this.camera.lookAt(this.scene.position);
        }

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar um pouco para garantir que o Three.js carregou
    setTimeout(() => {
        if (typeof THREE !== 'undefined') {
            new HeroCanvas();
        }
    }, 100);
}); 