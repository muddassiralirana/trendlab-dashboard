import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Components
import MiniWidgets from './MiniWidgets';
import RevenueAnalytics from './RevenueAnalytics';
import SalesAnalytics from './SalesAnalytics';
import EarningReports from './EarningReports';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: 'Trend Labs', link: '/' },
        { title: 'Dashboard', link: '#' },
      ],
      reports: [
        {
          icon: 'ri-stack-line',
          title: 'Total Earnings',
          value: '$ 4798.2',
          rate: '2.4%',
          desc: 'From previous period',
        },
        {
          icon: 'ri-store-2-line',
          title: 'Todays Earnings',
          value: '$ 38452',
          rate: '2.4%',
          desc: 'From previous period',
        },
        {
          icon: 'ri-briefcase-4-line',
          title: 'Earning in Last 30 Days',
          value: '$ 15.4',
          rate: '2.4%',
          desc: 'From previous period',
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Dashboard"
              breadcrumbItems={this.state.breadcrumbItems}
            />
            <h1>Earnings</h1>
            <Row>
              <Col xl={8}>
                <Row>
                  <MiniWidgets reports={this.state.reports} />
                </Row>

                {/* revenue Analytics */}
                <RevenueAnalytics />
              </Col>

              <Col xl={4}>
                {/* sales Analytics */}
                <SalesAnalytics />

                {/* earning reports */}
                <EarningReports />
              </Col>
            </Row>

            {/* <Row>
              <Sources />

              <RecentlyActivity />

              <RevenueByLocations />
            </Row> */}

            <h1>Users</h1>
            <Row>
              <Col xl={8}>
                <Row>
                  <MiniWidgets reports={this.state.reports} />
                </Row>

                {/* revenue Analytics */}
                <RevenueAnalytics />
              </Col>

              <Col xl={4}>
                {/* sales Analytics */}
                <SalesAnalytics />

                {/* earning reports */}
                <EarningReports />
              </Col>
            </Row>

            <h1>Subscriptions</h1>
            <Row>
              <Col md={6}>
                <RevenueAnalytics />
              </Col>

              <Col md={6}>
                <RevenueAnalytics />
              </Col>
            </Row>

            <h1>Withdraw Requests</h1>
            <Row>
              <MiniWidgets reports={this.state.reports} />
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
