import classNames from "classnames/bind";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "~/styles/FeedbackModal.module.scss";
import { axiosInterceptor } from "~/utils/axiosInterceptor";
const cx = classNames.bind(styles);
export const FeedbackModal = ({ show, onHide, idProduct }) => {
    const [star, setStar] = useState(0);
    const [comment, setComment] = useState("");
    const { user } = useSelector((state) => state.persist);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = axiosInterceptor(user, dispatch, navigate);

    const handleWriteFeedback = async () => {
        try {
            await axiosJWT.post("/api/binh-luan/tao-binh-luan", { productId: idProduct, star, comment });
            toast.success("Đánh giá thành công");
            onHide();
        } catch (error) {
            toast.error(error.response?.data.message || error.message);
        }
    };

    return (
        <Modal className={cx("wrapper")} show={show} onHide={onHide} centered={true}>
            <Modal.Header>Viết đánh giá</Modal.Header>
            <Modal.Body className="text-center">
                <textarea
                    className={cx("comment", "w-100")}
                    rows={4}
                    placeholder="Viết vào đây..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}></textarea>
                <div className={cx("star-select")}>
                    {[...Array(5).keys()].map((key) =>
                        key + 1 <= star ? (
                            <IoMdStar
                                className={cx("star", "selected", "fs-4")}
                                onMouseEnter={() => setStar(key + 1)}
                                onClick={() => setStar(key + 1)}
                            />
                        ) : (
                            <IoMdStarOutline
                                className={cx("star", "fs-4")}
                                onMouseEnter={() => setStar(key + 1)}
                                onClick={() => setStar(key + 1)}
                            />
                        )
                    )}
                </div>
                <Button onClick={handleWriteFeedback}>Gửi</Button>
            </Modal.Body>
        </Modal>
    );
};
