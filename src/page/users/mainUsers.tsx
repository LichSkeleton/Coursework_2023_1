import React, { useState, useEffect } from 'react';
import { PackagesServise, UsersServise } from '../../services/server_conn';
import { Button, Col, Nav, Row, Tab, TabContent } from 'react-bootstrap';
import AuthService from '../../components/ui/AuthServise'
import useTokenCheck from '../../components/ui/ProtectedRoute';

interface Package {
    id: number;
    name: string;
    price: number;
    months_available: number;
};

const MainUsers: React.FC = () => {
    useTokenCheck();

    // State to store the list of packages
    const [packages, setPackages] = useState<Package[]>([]);
    // State to track the active package and end date for the current user
    const [activePackageName, setActivePackageName] = useState<string | null>(null);
    const [activePackageId, setActivePackageId] = useState<number | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const email = AuthService.getEmail(AuthService.getJwtToken());
                // Fetch user's data
                const userData = await UsersServise.getByEmail(email);

                const user = userData[0];
                if (user .active_package_id !==null) {
                    const packageResponse = await PackagesServise.getById(user.active_package_id);
                    setActivePackageName(packageResponse.name);
                    setActivePackageId(user.active_package_id);
                    setEndDate(user.end_date);
                } else {
                    // Fetch packages
                    const response = await PackagesServise.getAll();
                    setPackages(response);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);
    
    // Function to handle package purchase
    const handlePurchase = async (packageId: number) => {
        try {
            const response = await UsersServise.postPackageUser(AuthService.getEmail(AuthService.getJwtToken()), packageId);
            const newJwtToken = response.accessToken;

            AuthService.logout();
            AuthService.login(newJwtToken);

            // Reload the page or update the state as needed
            window.location.reload();
        } catch (error: any) { 
            console.error('Error:', error);
        }
    };

    return (
        <div className="w-100">
            <Tab.Container id="left-tabs-example" defaultActiveKey="navPackages">
                <Row style={{ minHeight: "400px" }}>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column mt-2">
                            <Nav.Item>
                                <Nav.Link eventKey="navPackages">Пакети</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <TabContent>
                            <Tab.Pane eventKey="navPackages">
                                {activePackageId !== null ? (
                                    <div className='mt-3'>
                                        <h4>"{activePackageName}" пакет</h4>
                                        {endDate ? (
                                            <p>Доступний до: {new Date(endDate).toLocaleDateString()}</p>
                                        ) : null}
                                    </div>
                                ) : (
                                    packages.map((mypackage) => (
                                        <div key={mypackage.id} className='mt-3'>
                                            <h4>{mypackage.name}</h4>
                                            <p>Ціна: {mypackage.price} грн</p>
                                            <p>Дуступний буде: {mypackage.months_available} місяців</p>
                                            <Button onClick={() => handlePurchase(mypackage.id)}>Купити</Button>
                                            <hr />
                                        </div>
                                    ))
                                )}
                            </Tab.Pane>
                        </TabContent>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
};

export default MainUsers;