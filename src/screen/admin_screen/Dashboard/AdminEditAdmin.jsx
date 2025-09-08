import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';
import { updateAdmin } from '../../../store/action/userAppStorage';
import { Error } from '../../../component/common/Error';
import { AdminEditComponent } from '../../../component/adminscreencomp/Home/AdminEdit';

const AdminEdit = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthError, setIsAuthError] = useState(false);
    const [authInfo, setAuthInfo] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateAuthError = () => {
        setIsAuthError(prev => !prev);
        setAuthInfo('');
    };

    const showmenuHandler = () => {
        const drawer = document.querySelector('.drawerCon');
        drawer.classList.toggle('showdrawer');
    };

    const updateHandler = async (data) => {
        setIsLoading(true);
        const res = await dispatch(updateAdmin(data));
        if (!res.bool) {
            setIsAuthError(true);
            setAuthInfo(res.message);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        navigate('/admindashboard/users');
    }

    

    return (
        <>
            {isLoading && <LoadingModal />}
            {isAuthError && (
                <Error
                    modalVisible={isAuthError}
                    updateVisibility={updateAuthError}
                    message={authInfo}
                />
            )}
            <div className={styles.dashboard}>
                <div className={styles.sidebar}>
                    <Sidebar status='Cases' />
                </div>

                <div className={styles.main}>
                    <DashboardDrawer showmenuHandler={showmenuHandler} />
                    <DashboardHeader showmenuHandler={showmenuHandler} title='Home' />
                    <AdminEditComponent updateHandler={updateHandler} />
                </div>
            </div>
        </>
    );
};

export default AdminEdit;

