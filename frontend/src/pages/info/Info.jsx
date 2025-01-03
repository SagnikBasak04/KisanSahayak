import React from react;

const Info =() =>{
    useEffect(() => {
        gsap.from('.feature', {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: '.feature',
            start: 'top 80%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      }, []);
    
      return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
          {/* Header */}
          <header className="bg-green-500 text-white py-6">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl font-bold">Smart Agri Platform</h1>
              <p className="text-lg mt-2">
                Empowering farmers with technology to reduce crop wastage and boost productivity.
              </p>
            </div>
          </header>
    
          {/* Features Section */}
          <main className="container mx-auto px-4 py-10">
            {/* Feature 1 */}
            <section className="feature bg-white shadow-lg rounded-lg p-6 mb-10">
              <h2 className="text-2xl font-bold mb-4">1. Disease Detection</h2>
              <p className="text-gray-700">
                Upload images of crops, and our ResNet-9 deep learning model identifies diseases,
                provides detailed information, and recommends pesticides.
              </p>
              <img
                src="path/to/disease-detection-image.jpg"
                alt="Disease Detection"
                className="mt-4 rounded-lg"
              />
            </section>
    
            {/* Feature 2 */}
            <section className="feature bg-white shadow-lg rounded-lg p-6 mb-10">
              <h2 className="text-2xl font-bold mb-4">2. Marketplace</h2>
              <p className="text-gray-700">
                Buy and sell fertilizers and pesticides in our integrated marketplace, fostering a
                collaborative ecosystem.
              </p>
              <img
                src="path/to/marketplace-image.jpg"
                alt="Marketplace"
                className="mt-4 rounded-lg"
              />
            </section>
    
            {/* Feature 3 */}
            <section className="feature bg-white shadow-lg rounded-lg p-6 mb-10">
              <h2 className="text-2xl font-bold mb-4">3. Regional Crop Recommendations</h2>
              <p className="text-gray-700">
                Use our dashboard with rainfall, soil quality, and location data to find the best crops
                for your region.
              </p>
              <img
                src="path/to/dashboard-image.jpg"
                alt="Dashboard"
                className="mt-4 rounded-lg"
              />
            </section>
    
            {/* Feature 4 */}
            <section className="feature bg-white shadow-lg rounded-lg p-6 mb-10">
              <h2 className="text-2xl font-bold mb-4">4. Gamified Engagement</h2>
              <p className="text-gray-700">
                Earn points by contributing to the dataset or playing a prediction game to achieve
                "Expert Farmer" status.
              </p>
              <img
                src="path/to/gamified-engagement-image.jpg"
                alt="Gamification"
                className="mt-4 rounded-lg"
              />
            </section>
    
            {/* Feature 5 */}
            <section className="feature bg-white shadow-lg rounded-lg p-6 mb-10">
              <h2 className="text-2xl font-bold mb-4">5. Multilingual Support</h2>
              <p className="text-gray-700">
                Our platform supports multiple languages, ensuring accessibility for farmers across
                diverse regions.
              </p>
              <img
                src="path/to/multilingual-support-image.jpg"
                alt="Multilingual Support"
                className="mt-4 rounded-lg"
              />
            </section>
          </main>
    
          {/* Footer */}
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 Smart Agri Platform. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      );
}

export default Info;