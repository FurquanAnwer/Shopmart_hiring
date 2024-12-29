import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Our E-commerce Store',
  description: 'Learn more about our company, our mission, and our team.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">About Us</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to offer a wide range of high-quality products that cater to diverse needs and
            preferences, all while maintaining affordability. We strive to create a
            seamless shopping experience that keeps our customers coming back.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Team</h2>
          <p className="text-gray-600">
            Behind our store is a dedicated team of professionals who work tirelessly to ensure
            that we meet and exceed your expectations. From our product curators to our customer
            support staff, every member of our team is committed to your satisfaction.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Commitment</h2>
          <p className="text-gray-600">
            We are committed to sustainable and ethical business practices. We carefully select our
            suppliers and partners to ensure that our products are sourced responsibly and our
            operations have a minimal environmental impact.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Story</h2>
        <p className="text-gray-600 mb-4">
          Founded in 2023, our e-commerce store began with a simple idea: to provide high-quality products
          with exceptional customer service. What started as a small online shop has grown into a
          thriving marketplace, thanks to the support of our loyal customers and the dedication of our team.
        </p>
        <p className="text-gray-600">
          As we continue to grow, we remain committed to our core values of quality, affordability,
          and customer satisfaction. We're constantly expanding our product range and improving our
          services to meet the evolving needs of our customers.
        </p>
      </div>
    </div>
  )
}

