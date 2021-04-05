import React, { Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { agencyTheme } from 'common/theme/agency';
import { ResetCSS } from 'common/assets/css/style';
import { GlobalStyle, AgencyWrapper } from 'containers/Agency/agency.style';
import Navbar from 'containers/Agency/Navbar';
import MatchingSection from 'containers/Agency/MatchingSection';
import Footer from 'containers/Agency/Footer';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import ProjectDetailSection from 'containers/Agency/ProjectDetailSection';
import CommentsSection from 'containers/Agency/CommentsSection';

import data from 'common/data/Agency';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error'
import _ from 'lodash';

const Detail = () => {
  const router = useRouter();
  const { pid } = router.query;
  const project = _.find(data.projects, (project) => project.id === Number(pid));
  if (_.isEmpty(project)) {
    return <ErrorPage statusCode="404"></ErrorPage>
  }

  return (
    <ThemeProvider theme={agencyTheme}>
      <Fragment>
        {/* Start agency head section */}
        <Head>
          <title>Quadratic Funding Program</title>
          <meta name="theme-color" content="#10ac84" />
          <meta name="Description" content="Quadratic Funding Program" />
          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
            rel="stylesheet"
          />
        </Head>
        <ResetCSS />
        <GlobalStyle />
        {/* End of agency head section */}
        {/* Start agency wrapper section */}
        <AgencyWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <MatchingSection />
          <ProjectDetailSection project={project} />
          <CommentsSection />
          {/* <LineCharts /> */}
          {/* <NewsletterSection /> */}
          {/* <FeatureSection /> */}
          {/* <AboutUsSection /> */}
          {/* <WorkHistory /> */}
          {/* <BlogSection /> */}
          {/* <QualitySection /> */}
          {/* <VideoSection /> */}
          {/* <TestimonialSection /> */}
          {/* <ProjectSection /> */}
          {/* <FaqSection /> */}
          <Footer />
        </AgencyWrapper>
        {/* End of agency wrapper section */}
      </Fragment>
    </ThemeProvider>
  );
};
export default Detail;
