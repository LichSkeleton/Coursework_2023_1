import React, { useState, useEffect } from 'react';
import { PackagesServise } from '../../services/server_conn';
import { Col, Container, Nav, Row, Tab, TabContent } from 'react-bootstrap';
import { IRootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { getProfile, logoutUser } from '../../store/auth/actionCreators';
import SignInPage from '../SignIn/SignInPage';
import { Navigate } from 'react-router';

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
    const dispatch = useAppDispatch();

    const profile = useSelector(
        (state: IRootState) => state.auth.profileData.profile
    );
    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );
    console.log("isLoggedIn:", isLoggedIn);


    const renderProfile = () => (
        <>
            <div>
                <div>Ви успушно авторизувались, {profile}</div>
                <button onClick={() => dispatch(logoutUser())}>Logout</button>
                <button onClick={() => dispatch(getProfile())}>update profile</button>
            </div>
            <Container>
                <Tab.Container id="left-tabs-example" defaultActiveKey="navPackages">
                    <Row style={{ minHeight: "400px" }}>
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

    return (
        <>
            {isLoggedIn ? (
                <>
                    <h1>This is the Main component.</h1>
                    {renderProfile()}
                </>
            ) : (
                <>
                    <Navigate to={'/'} />
                </>
            )}
        </>
    );
};

export default MainUsers;