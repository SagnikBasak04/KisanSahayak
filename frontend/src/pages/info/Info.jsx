import Navbar from "../../components/navbars/Navbar-actions";

const Info = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <main className="container mx-auto px-4 py-10">
          {/* Features Section */}
          <section className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="feature bg-white shadow-md rounded-lg p-6 transition-transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Disease Detection
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Upload images of crops, and our ResNet-9 deep learning model
                identifies diseases, provides detailed information, and
                recommends pesticides.
              </p>
              <img
                src="/disease-pred-ss.png"
                alt="Disease Detection"
                className="mt-4 rounded-lg border border-gray-300"
              />
            </div>

            {/* Feature 2 */}
            <div className="feature bg-white shadow-md rounded-lg p-6 transition-transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Crop Management
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Get detailed insights on managing your crops effectively with
                region-specific recommendations and weather forecasts.
              </p>
              <img
                src="/crop-management-ss.png"
                alt="Crop Management"
                className="mt-4 rounded-lg border border-gray-300"
              />
            </div>

            {/* Feature 3 */}
            <div className="feature bg-white shadow-md rounded-lg p-6 transition-transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. Marketplace
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Connect with retailers and buyers through our farmer-friendly
                marketplace to sell your produce at fair prices.
              </p>
              <img
                src="/marketplace_ss.png"
                alt="Marketplace"
                className="mt-4 rounded-lg border border-gray-300"
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Info;
