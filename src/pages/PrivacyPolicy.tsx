import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

// ============================================================
// PRIVACY POLICY CONFIG — Edit contact info and dates here
// ============================================================
const CONFIG = {
  companyName: 'Disciple Co.',
  ownerName: 'Ryan Colby',
  websiteUrl: 'https://thediscipleco.org',
  supportEmail: 'support@thediscipleco.org', // Update with your real support email
  effectiveDate: 'June 5, 2026',
  lastUpdated: 'June 5, 2026',
};

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: 'overview',
    title: 'Overview',
    content: (
      <>
        <p>
          {CONFIG.companyName} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
          This Privacy Policy explains how we handle information in connection with our mobile application
          (&ldquo;The Disciple Co. App&rdquo;) and website located at{' '}
          <a href={CONFIG.websiteUrl} className="text-blue-600 dark:text-blue-400 underline hover:no-underline">
            {CONFIG.websiteUrl}
          </a>{' '}
          (collectively, the &ldquo;Services&rdquo;).
        </p>
        <p className="mt-3">
          By using our Services, you agree to the practices described in this Privacy Policy. If you do not
          agree, please discontinue use of the Services.
        </p>
      </>
    ),
  },
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    content: (
      <>
        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Information You Provide</p>
        <p>
          The Disciple Co. is designed to be used without creating an account. We do not require you to
          provide your name, email address, or any other personally identifiable information to use the
          core features of the app or website.
        </p>
        <p className="mt-3">
          If you contact us for support, we may collect your name and email address solely to respond
          to your inquiry.
        </p>

        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2 mt-5">Information Collected Automatically</p>
        <p>When you use our Services, we may automatically collect certain technical information, including:</p>
        <ul className="list-disc list-inside mt-2 space-y-1.5 text-gray-600 dark:text-gray-400">
          <li>Device type, operating system version, and app version</li>
          <li>General usage data (e.g., features accessed, session duration)</li>
          <li>Crash reports and diagnostic information</li>
          <li>IP address (used only to determine general geographic region)</li>
        </ul>
        <p className="mt-3">
          This information is collected in aggregate and anonymized form and is used solely to improve
          the performance and stability of the Services.
        </p>

        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2 mt-5">Local Storage &amp; Device Data</p>
        <p>
          Certain preferences you set within the app (such as theme, reading progress, and onboarding
          completion) are stored locally on your device using your device&apos;s built-in storage. This
          data never leaves your device and is not transmitted to our servers.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How We Use Information',
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside mt-2 space-y-1.5 text-gray-600 dark:text-gray-400">
          <li>Operate, maintain, and improve the Services</li>
          <li>Diagnose and fix technical problems and crashes</li>
          <li>Understand how users interact with the Services in aggregate</li>
          <li>Respond to support requests you submit to us</li>
          <li>Comply with applicable legal obligations</li>
        </ul>
        <p className="mt-3">
          We do not use your information for targeted advertising. We do not sell your personal
          information to any third party.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'Sharing of Information',
    content: (
      <>
        <p>
          We do not sell, rent, or trade your personal information. We may share information only in
          the following limited circumstances:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-600 dark:text-gray-400">
          <li>
            <span className="font-medium text-gray-700 dark:text-gray-300">Service Providers:</span>{' '}
            We may share anonymized, aggregate usage data with trusted third-party service providers who
            assist us in operating and improving the Services (e.g., analytics providers, crash reporting
            services). These providers are contractually obligated to protect your information and may
            not use it for any other purpose.
          </li>
          <li>
            <span className="font-medium text-gray-700 dark:text-gray-300">Legal Requirements:</span>{' '}
            We may disclose information if required by law, court order, or governmental authority, or
            if we believe disclosure is necessary to protect our rights, your safety, or the safety
            of others.
          </li>
          <li>
            <span className="font-medium text-gray-700 dark:text-gray-300">Business Transfer:</span>{' '}
            In the event of a merger, acquisition, or sale of assets, user information may be
            transferred as part of that transaction. We will notify you via a prominent notice on our
            website if such a change occurs.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'third-party',
    title: 'Third-Party Services',
    content: (
      <>
        <p>
          Our Services are distributed through the Apple App Store. Apple may collect information about
          your device and app usage in accordance with their own privacy policies. We encourage you to
          review{' '}
          <span className="text-blue-600 dark:text-blue-400">Apple&apos;s Privacy Policy</span> for
          more information.
        </p>
        <p className="mt-3">
          Our website is hosted through a third-party hosting provider. Standard web server logs may be
          maintained in accordance with that provider&apos;s policies.
        </p>
        <p className="mt-3">
          We may use a third-party database service (Supabase) to store content such as Bible verses,
          music, and books available within the app. No personally identifiable user information is
          stored in this database.
        </p>
      </>
    ),
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    content: (
      <>
        <p>
          We retain anonymized usage and diagnostic data only as long as necessary to fulfill the
          purposes outlined in this Privacy Policy, or as required by law.
        </p>
        <p className="mt-3">
          Data stored locally on your device (preferences, reading progress) remains on your device
          until you delete the app or clear the app&apos;s data through your device settings.
        </p>
        <p className="mt-3">
          If you contact us for support, we retain your correspondence only as long as necessary to
          resolve your request and for a reasonable period thereafter.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: "Children's Privacy",
    content: (
      <>
        <p>
          Our Services are not directed to children under the age of 13. We do not knowingly collect
          personal information from children under 13. If you are a parent or guardian and believe
          your child has provided us with personal information, please contact us at{' '}
          <a href={`mailto:${CONFIG.supportEmail}`} className="text-blue-600 dark:text-blue-400 underline hover:no-underline">
            {CONFIG.supportEmail}
          </a>{' '}
          and we will promptly delete such information.
        </p>
        <p className="mt-3">
          If you are between the ages of 13 and 18, please obtain parental or guardian consent before
          using the Services.
        </p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your Rights &amp; Choices',
    content: (
      <>
        <p>
          Since we collect minimal personal information, there is little personal data to exercise
          rights over. However, depending on your location, you may have the following rights:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-600 dark:text-gray-400">
          <li>
            <span className="font-medium text-gray-700 dark:text-gray-300">Access:</span>{' '}
            Request information about what personal data we hold about you.
          </li>
          <li>
            <span className="font-medium text-gray-700 dark:text-gray-300">Deletion:</span>{' '}
            Request deletion of any personal data we may hold. Note: locally stored data can be
            deleted by uninstalling the app.
          </li>
          <li>
            <span className="font-medium text-gray-700 dark:text-gray-300">Correction:</span>{' '}
            Request correction of inaccurate personal data.
          </li>
          <li>
            <span className="font-medium text-gray-700 dark:text-gray-300">Opt-Out:</span>{' '}
            You may opt out of analytics data collection through your device&apos;s privacy settings
            (e.g., &ldquo;Limit Ad Tracking&rdquo; or &ldquo;Allow Apps to Request to Track&rdquo; on iOS).
          </li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, contact us at{' '}
          <a href={`mailto:${CONFIG.supportEmail}`} className="text-blue-600 dark:text-blue-400 underline hover:no-underline">
            {CONFIG.supportEmail}
          </a>.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    content: (
      <>
        <p>
          We take reasonable technical and organizational measures to protect information from
          unauthorized access, disclosure, alteration, or destruction. However, no method of
          transmission over the internet or electronic storage is 100% secure. We cannot guarantee
          absolute security.
        </p>
        <p className="mt-3">
          In the event of a data breach that affects your personal information, we will notify you
          as required by applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'california',
    title: 'California Privacy Rights (CCPA)',
    content: (
      <>
        <p>
          If you are a California resident, you have additional rights under the California Consumer
          Privacy Act (CCPA), including the right to know what personal information is collected,
          the right to delete personal information, and the right to opt out of the sale of personal
          information.
        </p>
        <p className="mt-3 font-medium text-gray-700 dark:text-gray-300">
          We do not sell personal information. We do not share personal information for
          cross-context behavioral advertising.
        </p>
        <p className="mt-3">
          To exercise your California privacy rights, contact us at{' '}
          <a href={`mailto:${CONFIG.supportEmail}`} className="text-blue-600 dark:text-blue-400 underline hover:no-underline">
            {CONFIG.supportEmail}
          </a>.
          We will not discriminate against you for exercising your privacy rights.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Privacy Policy',
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time. When we make changes, we will update
          the &ldquo;Last Updated&rdquo; date at the top of this page. For significant changes, we will provide
          a more prominent notice, such as an in-app notification or a notice on our website.
        </p>
        <p className="mt-3">
          Your continued use of the Services after any changes to this Privacy Policy constitutes
          your acceptance of the updated policy. We encourage you to review this page periodically.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: (
      <>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our
          privacy practices, please contact us:
        </p>
        <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-5 space-y-2 text-sm">
          <p><span className="font-semibold text-gray-700 dark:text-gray-200">Company:</span> <span className="text-gray-600 dark:text-gray-400">{CONFIG.companyName}</span></p>
          <p><span className="font-semibold text-gray-700 dark:text-gray-200">Owner:</span> <span className="text-gray-600 dark:text-gray-400">{CONFIG.ownerName}</span></p>
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-200">Email:</span>{' '}
            <a href={`mailto:${CONFIG.supportEmail}`} className="text-blue-600 dark:text-blue-400 underline hover:no-underline">
              {CONFIG.supportEmail}
            </a>
          </p>
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-200">Website:</span>{' '}
            <a href={CONFIG.websiteUrl} className="text-blue-600 dark:text-blue-400 underline hover:no-underline">
              {CONFIG.websiteUrl}
            </a>
          </p>
        </div>
      </>
    ),
  },
];

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Header */}
      <div className="bg-slate-900 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-white/50 text-sm font-medium uppercase tracking-widest">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/50 text-sm">
            Effective: {CONFIG.effectiveDate} &nbsp;&bull;&nbsp; Last Updated: {CONFIG.lastUpdated}
          </p>
        </div>
      </div>

      {/* Table of Contents + Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Intro callout */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-xl p-5 mb-10">
          <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
            <strong>Summary:</strong> Disciple Co. collects minimal data. We do not require an account,
            do not sell your information, and do not show ads. Preferences are stored locally on your
            device and never transmitted to our servers.
          </p>
        </div>

        {/* Table of contents */}
        <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-5 mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Table of Contents</p>
          <ol className="space-y-1.5">
            {SECTIONS.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-baseline gap-2"
                  dangerouslySetInnerHTML={{ __html: `<span class="text-gray-400 dark:text-gray-600 font-mono">${String(i + 1).padStart(2, '0')}.</span> ${section.title}` }}
                />
              </li>
            ))}
          </ol>
        </div>

        {/* Policy sections */}
        <div className="space-y-10">
          {SECTIONS.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-xs font-mono text-gray-300 dark:text-gray-600 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2
                  className="text-xl font-bold text-gray-900 dark:text-white"
                  dangerouslySetInnerHTML={{ __html: section.title }}
                />
              </div>
              <div className="pl-7 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {section.content}
              </div>
              {i < SECTIONS.length - 1 && (
                <hr className="mt-10 border-gray-100 dark:border-gray-800" />
              )}
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            &copy; {CONFIG.ownerName}. {new Date().getFullYear()}. All rights reserved. &nbsp;&bull;&nbsp;{' '}
            <Link to="/app" className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
              Download the App
            </Link>
            {' '}&nbsp;&bull;&nbsp;{' '}
            <a href={`mailto:${CONFIG.supportEmail}`} className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
