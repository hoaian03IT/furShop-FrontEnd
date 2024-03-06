import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { BreadCrumbs } from "~/components/BreadCrumbs";
import { pathname } from "~/configs/path";
import classNames from "classnames/bind";
import styles from "~/styles/UserProfilePage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { uploadProfileApi } from "~/api-server";
import { axiosInterceptor } from "~/utils/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function UserProfilePage() {
    const [newAvatarUrl, setNewAvatarUrl] = useState(null);

    const { user } = useSelector((state) => state.persist);
    const { userInfo } = user;

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setNewAvatarUrl(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = axiosInterceptor(user, dispatch, navigate);

    const handleUpdate = async () => {
        try {
            await uploadProfileApi(
                { image: newAvatarUrl, username: userInfo.username, phone: userInfo.phone, gender: userInfo.gender },
                axiosJWT,
                dispatch
            );
            toast.success("Cập nhật thành công");
        } catch (error) {}
    };

    return (
        <div>
            <Container>
                <BreadCrumbs
                    hrefs={[
                        { path: pathname.home, name: "Trang chủ", isCurrent: false },
                        { path: pathname.account, name: "Trang Khách Hàng", isCurrent: true },
                    ]}
                />
                <div className={cx("user-info")}>Thông Tin Tài Khoản</div>
                <div className={cx("avatar-section")}>
                    <img src={newAvatarUrl || userInfo.image} alt="Avatar" className={cx("avatar")} />
                    <div className={cx("avatar-selector")}>
                        <label htmlFor="avatar-input" className={cx("file-input-label")}>
                            Chọn ảnh mới
                        </label>
                        <input
                            id="avatar-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={cx("file-input")}
                        />
                    </div>
                </div>
                <div>
                    <p>Tên Đăng Nhập : {userInfo?.username}</p>
                    <p>Giới Tính : {userInfo?.gender === 0 ? "Nam" : userInfo?.gender === 1 ? "Nữ" : "Khác"}</p>
                    <p>Email : {userInfo?.email}</p>
                    <p>Password : *******</p>
                    <p>Số Điện Thoại : {userInfo.phone} </p>
                </div>
                <Button onClick={handleUpdate}>Cập nhật</Button>
            </Container>
        </div>
    );
}

export default UserProfilePage;
