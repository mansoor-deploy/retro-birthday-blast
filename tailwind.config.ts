
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				neon: {
					pink: '#ff2d55',
					blue: '#0066ff',
					yellow: '#ffce00',
					purple: '#5856d6',
				},
				retro: {
					dark: '#1a1a2e',
					light: '#f8f9fa',
					accent: '#ff2d55',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						filter: 'brightness(100%) blur(0px)'
					},
					'50%': { 
						opacity: '0.8',
						filter: 'brightness(130%) blur(1px)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'neon-pulse': {
					'0%, 100%': { 
						textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ff2d55, 0 0 82px #ff2d55, 0 0 92px #ff2d55, 0 0 102px #ff2d55, 0 0 151px #ff2d55'
					},
					'50%': { 
						textShadow: '0 0 4px #fff, 0 0 7px #fff, 0 0 13px #fff, 0 0 25px #ff2d55, 0 0 50px #ff2d55, 0 0 60px #ff2d55, 0 0 70px #ff2d55, 0 0 100px #ff2d55'
					}
				},
				'confetti-fall': {
					'0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
					'100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-right': 'fade-in-right 0.6s ease-out',
				'fade-in-left': 'fade-in-left 0.6s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'float': 'float 4s ease-in-out infinite',
				'scale-in': 'scale-in 0.5s ease-out',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
				'confetti-fall': 'confetti-fall 5s linear forwards'
			},
			backgroundImage: {
				'retro-grid': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
				'retro-lines': "url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.615-1.176 2.224-2.007 2.7-3.264 1.14-4.78.856-11.173.07-15.145-.706-2.268-2.23-4.14-3.617-5.044-1.93-1.26-4.256-1.5-6.36-.885-1.98.575-3.855 2.093-4.63 3.625-.43.852-.903 1.47-1.505 2.625-.525-1.962-1.848-3.82-3.634-5.04C4.004.665 2.248.15.856.37c-1.062.267-2.37.814-3.343 1.945-1.865 2.16-1.44 5.5-.115 8.05 1.002 1.29 2.254 2.44 3.917 2.826 1.18.27 2.394.347 3.63.103-1.304 1.76-2.224 4.19-2.098 7.14.04 1.2.232 2.43.428 3.1.965 3.31 3.605 5.67 6.756 6.32 2.75.567 5.657.07 7.82-1.675.736-.597 1.33-1.34 1.66-2.06.33.19.678.396 1.032.615 3.45 2.115 6.674 1.04 7.915-.928 1.334-2.125.19-4.906-2.276-6.885zM2.13 3.634c.57-1.565 1.648-2.572 2.798-2.83.96-.216 2.058.044 2.566.638.598.598.61 1.484.287 2.438-.723 2.162-2.95 3.338-5.367 2.89-.53-.1-1.07-.33-1.49-.583.045-.333.097-.667.155-1.01.28-1.7.37-2.94.05-1.544zm14.19 14.032c-2.31.532-4.262-.273-6.378-1.544-.848-.525-1.89-1.247-2.355-2.277-.886-1.97-.691-4.04-.072-5.937.692-2.127 2.13-3.984 3.96-4.535 2.744-.827 5.326.56 6.64 3.328.82 1.74.985 3.713.785 5.61-.922 2.312-1.227 3.93-2.58 5.353zm10.795-9.355c.647-2.028.447-3.758-.137-4.908-.648-1.283-1.895-2.073-3.25-2.128-1.37-.055-2.784.537-3.52 1.508-.834 1.108-1.01 2.354-.901 3.42.104 1.016.466 2.066.832 3.08 1.677-.642 3.775-1.035 5.657-.876.9.113 1.675.39 1.32-.096zm-9.557 6.792c-2.96 3.06-7.907 2.592-10.734-.874-2.92-3.508-2.89-8.494.06-11.767 1.95-2.167 5.12-2.74 7.54-2.24 2.27.47 4.378 1.96 5.608 4.2 1.607 2.957 1.607 7.062-.474 10.68z' fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
			},
			fontFamily: {
				retro: ['VT323', 'monospace'],
				display: ['Righteous', 'cursive'],
				body: ['Inter', 'sans-serif']
			},
			boxShadow: {
				'neon': '0 0 5px theme(colors.neon.pink), 0 0 20px theme(colors.neon.pink)',
				'neon-blue': '0 0 5px theme(colors.neon.blue), 0 0 20px theme(colors.neon.blue)',
				'neon-yellow': '0 0 5px theme(colors.neon.yellow), 0 0 20px theme(colors.neon.yellow)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
			},
			transitionDuration: {
				'2000': '2000ms',
				'3000': '3000ms',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
