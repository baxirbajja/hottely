/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-beige': '#E5D9D3',
        'deep-brown': '#3A302C',
        'soft-cream': '#F5F0EC',
        'accent-gold': '#BFA888',
        'text-dark': '#2C2420',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'widest': '.25em',
      },
      backgroundImage: {
        'grain': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAD8/vz08vT09vT8+vzs7uxH16TeAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAuFJREFUOI0Vk+3NLiEIRG1B8ClAYAsQ2AIEt4D9ePtv5Xp/mZgYJ2fOFJKEfInkVWY2aglmQFkimRTV7MblYyVqD7HXyhKsSuPX12MeDhRHLtGvRG+P+B/S0Vu4OswR9tmvwNPyhdCDbVayJGads/WiUWcjCvCnruTBNHS9gmX2VzVbk7ZvB1gb1hkWFGl+A/n+/FowcO34U/XvKqZ/fHY+6vgRfU92XrOBUbGeeDfQmjWjdrK+frc6FdGReQhfSF5JvR29O2QrfNw1huTwlgsyXLo0u+5So82sgv7tsFZR2nxB6lXiquHrfD8nfYZ9SeT0LiuvSoVrxGY16pCNRZKqvwWsn5OHypPBELzohMCaRaa0ceTHYqe7X/gfJEEtKFbJpWoNqO+aS1cuTykGPpK5Ga48m6L3NefTr013qQnGWpyBYxf1548//oXuVX8MH+donQ6azjT0AqYUxwjzXkThzzW33D+u9QdZ5R67KKHYhz5rL3iZ8H4+ki9FuZHnF3NIrwguWJ+3wcLhVTvvMl7uJBtVt4ryGj3ZvHmx0EXXpL1XwRyThHxJ5AcXJF/w9fLpSR7bsU+YzfiX/DY4PENg/eHpJnCsB5ijfOZjRLoeBY1HxMf8R4QkoqgaXSnxwgfHePz4c+Z3MkPbCvEhveMiUrj9g/0kH8kNyEBvK7YCB1N8goGxeV8g7nyuf2A8M3V8MH5MGsuZ9qJYZvNUEYc1+wc+7HwqjoVCWY5RyqT9g/h1v61e/kH8vPvEbKF/K+JmC4I5B2/n7wQX7F8wvyOVw4PpNcWY+2cF/GmxgKE/CQR/1AdQ3IJohYOBT4bzh/SRwKZ1RtYG/WkIj3l0hgfzC/yGfXvFjw0tqU/4kSFb/xh/i59i9of+JbhB12+FjwXnJxR6+8j4WQVvP+ZS6B/JLO8cH0/0Z/7l8Jf+FCF/k/+kP+V5X/gf0A8bZkeGgqAAAAAASUVORK5CYII=')",
      },
    },
  },
  plugins: [],
}
