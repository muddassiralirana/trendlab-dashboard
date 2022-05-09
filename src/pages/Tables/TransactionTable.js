import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

// datatable related plugins
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator';

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import './datatables.scss';

// Table data
const data = [
  {
    id: 1,
    name: 'ali',
    email: 'ali@gmailo.com',
    TradingName: 'JimmyAR',
    AmountPaid: '1',
    Date: '$0',
  },

  {
    id: 2,
    name: 'khan',
    email: 'ali@gmailo.com',
    TradingName: 'JimmyAR',
    AmountPaid: '1',
    Date: '$0',
  },

  {
    id: 3,
    name: 'ali',
    email: 'ali@gmailo.com',
    TradingName: 'JimmyAR',
    AmountPaid: '1',
    Date: '$0',
  },
];

class TranactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: 'Home', link: '/' },
        { title: 'Users', link: '#' },
      ],
      page: 1,
      sizePerPage: 10,
      productData: data,
    };
  }

  render() {
    const columns = [
      {
        dataField: 'id',
        text: 'User ID',
        sort: true,
      },
      {
        dataField: 'name',
        text: 'Full Name',
        sort: true,
      },
      {
        dataField: 'email',
        text: 'Email',
        sort: true,
      },
      {
        dataField: 'TradingName',
        text: 'Trading Name',
        sort: true,
      },

      {
        dataField: 'AmountPaid',
        text: 'Amount Paid',
        sort: true,
      },

      {
        dataField: 'Date',
        text: 'Date',
        sort: true,
      },
    ];

    const defaultSorted = [
      {
        dataField: 'id',
        order: 'asc',
      },
    ];

    const pageOptions = {
      sizePerPage: 10,
      totalSize: data.length, // replace later with size(customers),
      custom: true,
    };

    // Select All Button operation
    const selectRow = {
      mode: 'checkbox',
    };

    const { SearchBar } = Search;

    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs
              title="Tables"
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Users Table </CardTitle>

                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={columns}
                      data={this.state.productData}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={columns}
                          data={this.state.productData}
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col md="4">
                                  <div className="search-box me-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                      <i className="search-box chat-search-box" />
                                    </div>
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={'id'}
                                      responsive
                                      bordered={false}
                                      striped={false}
                                      defaultSorted={defaultSorted}
                                      selectRow={selectRow}
                                      classes={
                                        'table align-middle table-nowrap'
                                      }
                                      headerWrapperClasses={'thead-light'}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="align-items-md-center mt-30">
                                <Col className="inner-custom-pagination d-flex">
                                  <div className="d-inline">
                                    <SizePerPageDropdownStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                  <div className="text-md-right ms-auto">
                                    <PaginationListStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TranactionTable;
