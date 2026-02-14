import { PageHeader } from '@/components/page-header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Save Rosemary Heights',
  description: 'Learn about our community organization dedicated to preserving and protecting the Rosemary Heights neighborhood. Our mission, values, and the people who make it happen.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="About Save Rosemary Heights"
        description="A community organization dedicated to preserving and protecting our beloved neighborhood through advocacy, education, and action."
        badge="Our Story"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg dark:prose-dark max-w-none">
          <h2>Our Mission</h2>
          <p>
            Save Rosemary Heights is a grassroots community organization founded by residents who believe in the power of collective action to preserve and enhance our neighborhood&apos;s unique character, natural beauty, and strong sense of community.
          </p>

          <h2>What We Do</h2>
          <ul>
            <li><strong>Environmental Protection</strong>: Advocating for the preservation of green spaces, heritage trees, and sustainable development practices.</li>
            <li><strong>Community Building</strong>: Organizing events, initiatives, and programs that bring neighbors together.</li>
            <li><strong>Civic Engagement</strong>: Helping residents participate effectively in local government and decision-making processes.</li>
            <li><strong>Information Sharing</strong>: Keeping the community informed about local issues, opportunities, and developments.</li>
          </ul>

          <h2>Our Values</h2>
          <ul>
            <li><strong>Community First</strong>: Every decision is made with the best interests of our neighborhood in mind.</li>
            <li><strong>Transparency</strong>: We believe in open communication and inclusive decision-making.</li>
            <li><strong>Sustainability</strong>: We&apos;re committed to environmental stewardship for future generations.</li>
            <li><strong>Respect</strong>: We value diverse perspectives and treat all community members with dignity.</li>
            <li><strong>Action</strong>: We turn concerns into concrete solutions through organized effort.</li>
          </ul>

          <h2>Get Involved</h2>
          <p>
            There are many ways to contribute to our community&apos;s success. Whether you have five minutes or five hours to spare, there&apos;s a place for you in our organization.
          </p>

          <p>
            <strong>Contact us at info@saverosemaryheights.com or attend our monthly community meetings to learn more about volunteer opportunities.</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
