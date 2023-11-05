import React, { useState, useEffect } from 'react';
import { PackagesServise } from '../../services/server_conn';
import { Col, Container, Nav, Row, Tab, TabContent } from 'react-bootstrap';

type Package = {
    id: number;
    name: string;
    price: number;
    monthsAvailable: number;
};

interface PackageState {
    packages: Package[];
    activeTab: string;
}

const MainUsers: React.FC = () => {

    return (
        <>
        <Container>
            <Tab.Container id="left-tabs-example" defaultActiveKey="navPackages">
                <Row style={{minHeight: "400px"}}>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column mt-2">
                            <Nav.Item>
                                <Nav.Link eventKey="navPackages">Packages</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm="9">
                        <TabContent>
                            <Tab.Pane eventKey="navPackages">
                                
                            </Tab.Pane>
                        </TabContent>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
        </>
    );
};

export default MainUsers;