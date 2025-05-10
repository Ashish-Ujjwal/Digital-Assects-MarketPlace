import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaShieldAlt, FaCookie, FaBalanceScale, FaArrowLeft, FaPrint } from 'react-icons/fa';

const LegalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeDocument, setActiveDocument] = useState('');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define document types for navigation
  const documentTypes = [
    { id: 'terms', name: 'Terms of Service', icon: <FaFileAlt /> },
    { id: 'privacy', name: 'Privacy Policy', icon: <FaShieldAlt /> },
    { id: 'cookies', name: 'Cookies Policy', icon: <FaCookie /> },
    { id: 'compliance', name: 'Compliance', icon: <FaBalanceScale /> }
  ];

  useEffect(() => {
    // Parse URL to determine which legal document to show
    const path = location.pathname.toLowerCase();
    
    setLoading(true);
    let documentType = '';
    
    if (path.includes('terms') || path.includes('tos') || path.includes('toc')) {
      documentType = 'terms';
    } else if (path.includes('privacy')) {
      documentType = 'privacy';
    } else if (path.includes('cookies')) {
      documentType = 'cookies';
    } else if (path.includes('compliance')) {
      documentType = 'compliance';
    } else {
      // Default to terms if path is just /legal
      documentType = 'terms';
    }
    
    setActiveDocument(documentType);
    
    // Fetch document content
    fetchLegalDocument(documentType)
      .then(data => {
        setContent(data);
        setLoading(false);
        // Set page title for better SEO and accessibility
        document.title = `${data.title} | Your Company`;
      })
      .catch(err => {
        setError('Failed to load document. Please try again later.');
        setLoading(false);
      });
  }, [location.pathname]);

  // Mock function to fetch legal content - replace with your actual data fetching
  const fetchLegalDocument = async (type) => {
    // Simulating API call with timeout
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock data based on document type
    switch (type) {
        case 'terms':
          return {
            title: 'Terms of Service',
            icon: <FaFileAlt />,
            lastUpdated: 'March 15, 2025',
            sections: [
              {
                heading: 'Introduction',
                content: `Welcome to [Your Company]. By accessing our website and using our services, you agree to comply with and be bound by these Terms of Service. Please read them carefully before using our site.`
              },
              {
                heading: 'License and Use',
                content: `All templates purchased from our site are licensed for use according to the license type you select. Templates are licensed, not sold, and you are granted a non-exclusive, non-transferable right to use the purchased templates.`
              },
              {
                heading: 'Payment & Refund Policy',
                content: `Payments for template purchases must be made in full prior to delivery. Refunds will only be issued in cases where the template is found to be defective or not as described, subject to our refund policy guidelines.`
              },
              {
                heading: 'User Obligations',
                content: `Users agree to use our website and its content only for lawful purposes and in accordance with these terms. You are responsible for maintaining the confidentiality of your account and password.`
              },
              {
                heading: 'Limitation of Liability',
                content: `In no event shall [Your Company] be liable for any indirect, incidental, special, or consequential damages arising from your use or inability to use our services, even if we have been advised of the possibility of such damages.`
              },
              {
                heading: 'Indemnification',
                content: `You agree to indemnify, defend, and hold harmless [Your Company] and its affiliates from any claims, damages, liabilities, or expenses arising out of your use of the site or breach of these terms.`
              },
              {
                heading: 'Governing Law and Dispute Resolution',
                content: `These terms shall be governed by and construed in accordance with the laws of [Your State/Country]. Any disputes arising out of these terms shall be resolved through arbitration or in the appropriate courts.`
              },
              {
                heading: 'Modifications to Terms',
                content: `We reserve the right to modify these Terms of Service at any time. Continued use of our services after any such changes constitutes your acceptance of the new terms.`
              }
            ]
          };
    
        case 'privacy':
          return {
            title: 'Privacy Policy',
            icon: <FaShieldAlt />,
            lastUpdated: 'February 20, 2025',
            sections: [
              {
                heading: 'Data Collection',
                content: `We collect personal information that you voluntarily provide when registering, placing an order, or communicating with us. This includes, but is not limited to, your name, email address, and payment information.`
              },
              {
                heading: 'Use of Your Information',
                content: `We use your personal data to process orders, provide customer support, and improve your shopping experience. Your information may also be used for marketing purposes if you have opted in.`
              },
              {
                heading: 'Data Security',
                content: `We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.`
              },
              {
                heading: 'Data Sharing and Third Parties',
                content: `Your information may be shared with trusted third-party service providers for order fulfillment and website analytics. We do not sell or rent your personal information to third parties.`
              },
              {
                heading: 'Your Rights',
                content: `You have the right to access, update, or delete your personal information. If you wish to exercise these rights or have any questions about your data, please contact us at [Contact Email].`
              },
              {
                heading: 'Cookies & Tracking Technologies',
                content: `We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and tailor our services. For more details, please refer to our Cookies Policy.`
              },
              {
                heading: 'Data Retention',
                content: `We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.`
              }
            ]
          };
    
        case 'cookies':
          return {
            title: 'Cookies Policy',
            icon: <FaCookie />,
            lastUpdated: 'January 5, 2025',
            sections: [
              {
                heading: 'What Are Cookies?',
                content: `Cookies are small text files stored on your device by your web browser when you visit our website. They are used to enhance user experience and provide customized content.`
              },
              {
                heading: 'How We Use Cookies',
                content: `We use cookies to understand and save user preferences, to track user behavior on our site, and to tailor our content and advertisements. This information is aggregated and anonymized.`
              },
              {
                heading: 'Types of Cookies We Use',
                content: `We employ several types of cookies including session cookies (temporary) and persistent cookies (stored on your device). Third-party cookies may also be used for analytics and advertising purposes.`
              },
              {
                heading: 'Managing Cookies',
                content: `Most browsers allow you to control cookies through your browser settings. You can set your browser to reject cookies or to alert you when cookies are being sent. Please note that disabling cookies may affect the functionality of our website.`
              },
              {
                heading: 'Changes to the Cookies Policy',
                content: `We may update this Cookies Policy from time to time. Any changes will be posted on this page with an updated revision date.`
              }
            ]
          };
    
        case 'compliance':
          return {
            title: 'Compliance',
            icon: <FaBalanceScale />,
            lastUpdated: 'March 1, 2025',
            sections: [
              {
                heading: 'GDPR Compliance',
                content: `For our users in the European Union, we strictly adhere to the General Data Protection Regulation (GDPR) guidelines. We ensure transparency in our data handling practices and safeguard your privacy rights.`
              },
              {
                heading: 'DMCA Compliance',
                content: `We respect the intellectual property rights of others. If you believe that your copyrighted work has been used on our site in a way that constitutes infringement, please contact our designated agent at [DMCA Email] with your notice.`
              },
              {
                heading: 'Accessibility',
                content: `We are committed to ensuring our website is accessible to all users, including those with disabilities. We continuously work to improve accessibility and welcome feedback on any accessibility issues.`
              },
              {
                heading: 'Legal Disputes and Arbitration',
                content: `In the event of any legal disputes, we agree to resolve matters through binding arbitration in accordance with the rules of [Arbitration Organization], unless prohibited by applicable law.`
              },
              {
                heading: 'Contact Information for Compliance',
                content: `If you have any questions or concerns regarding our compliance policies, please reach out to our compliance team at [Compliance Email].`
              }
            ]
          };
    
        default:
          return {
            title: 'Terms of Service',
            icon: <FaFileAlt />,
            lastUpdated: 'March 15, 2025',
            sections: [
              {
                heading: 'Default Legal Information',
                content: 'Please select a specific legal document from the footer to view detailed information.'
              }
            ]
          };
    }
  };

  const handleDocumentChange = (documentType) => {
    navigate(`/legal/${documentType}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="legal-page loading">
        <div className="loading-spinner"></div>
        <p>Loading document...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="legal-page error">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="legal-page">
      <div className="page-actions">
        <button onClick={handleBack} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <button onClick={handlePrint} className="print-button">
          <FaPrint /> Print
        </button>
      </div>

      <header className="legal-header">
        <div className="icon-container">
          {content.icon}
        </div>
        <h1>{content.title}</h1>
        <p className="last-updated">Last Updated: {content.lastUpdated}</p>
      </header>

      <nav className="legal-nav">
        {documentTypes.map((doc) => (
          <button
            key={doc.id}
            className={`legal-nav-item ${activeDocument === doc.id ? 'active' : ''}`}
            onClick={() => handleDocumentChange(doc.id)}
            aria-current={activeDocument === doc.id ? 'page' : undefined}
          >
            <span className="icon">{doc.icon}</span>
            <span>{doc.name}</span>
          </button>
        ))}
      </nav>

      <div className="legal-content">
        {content.sections.map((section, index) => (
          <section key={index} className="legal-section" id={`section-${index}`}>
            <h2>{section.heading}</h2>
            <div className="section-content">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default LegalPage;