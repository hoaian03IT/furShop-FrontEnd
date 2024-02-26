import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { BreadCrumbs } from '~/components/BreadCrumbs';
import { pathname } from '~/configs/path';
import classNames from 'classnames/bind';
import styles from '~/styles/UserProfilePage.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function UserProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState(localStorage?.avatar || ""); // Mặc định avatar URL
  const [newAvatarUrl, setNewAvatarUrl] = useState(null); // Avatar URL mới được chọn từ máy của người dùng

  const {userInfo} = useSelector(state=> state.persist.user)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatarUrl(reader.result); // Cập nhật ảnh người dùng ngay khi họ chọn tệp
      setNewAvatarUrl(reader.result); // Lưu URL của ảnh mới được chọn
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Container>
        <BreadCrumbs
          hrefs={[
            { path: pathname.home, name: 'Trang chủ', isCurrent: false },
            { path: pathname.account, name: 'Trang Khách Hàng', isCurrent: true },
          ]}
        />
        <div className={cx('user-info')}>Thông Tin Tài Khoản</div>
        <div className={cx('avatar-section')}>
          <img src={avatarUrl} alt="Avatar" className={cx('avatar')} />
          <div className={cx('avatar-selector')}>
            <label htmlFor="avatar-input" className={cx('file-input-label')}>
              Chọn ảnh mới
            </label>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={cx('file-input')}
            />
          </div>
        </div>
        <div>
          <p>Tên Đăng Nhập :{localStorage?.name}</p>
          <p>Giới Tính : {}</p>
          <p>Email : {localStorage?.email}</p>
          <p>Password : </p>
          <p>Số Điện Thoại : </p>
          
        </div>
      </Container>
    </div>
  );
}

export default UserProfilePage;
