		function w3_open() {
			document.getElementById("mySidebar").style.width = "100%";
			document.getElementById("mySidebar").style.display = "block";
		}

		function w3_close() {
			document.getElementById("mySidebar").style.display = "none";
		}


//disintegration for homepage
const setRandomSeed = () => {
			const turbulence = document.getElementById("dissolve-filter-turbulence");
			console.log('turbulence', turbulence);
			turbulence.setAttribute("seed", Math.random() * 1000);
		}

		const easeOutCubic = (t) => {
			return 1 - Math.pow(1 - t, 3);
		}

		const maxDisplacementScale = 2000;

		const useThanosSnap = (element) => {
			if (element.getAttribute("data-being-destroyed") === "true") return;

			const displacement = document.getElementById("dissolve-filter-displacement");
			setRandomSeed();
			element.style.filter = "url(#dissolve-filter)";

			const duration = 1000;
			const startTime = performance.now();
			element.setAttribute("data-being-destroyed", "true");

			const animate = (currentTime) => {
				const elapsedTime = currentTime - startTime;
				const progress = Math.min(elapsedTime / duration, 1);
				const displacementScale = easeOutCubic(progress) * maxDisplacementScale;

				displacement.setAttribute("scale", displacementScale);
				element.style.transform = `scale(${1 + 0.1 * progress})`;

				const opacity = progress < 0.5 ? 1 : 1 - ((progress - 0.5) * 0.5);

				if (progress < 1) {
					requestAnimationFrame(animate);
				} else {
					displacement.setAttribute("scale", 0);
					element.remove();
				}
			};

			requestAnimationFrame(animate);
		};


		const deleteElement = (element) => {
            setTimeout(() => {
				document.getElementById("video").style.display="inline";
                setTimeout(() => {if (element === 'document') {
				element = window.document.documentElement;
			}
			useThanosSnap(element);}, 1900);
			setTimeout(() => {
				location.reload();
			}, 3000);
			}, 1000);
			
		}
