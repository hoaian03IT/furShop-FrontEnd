import { Modal } from "react-bootstrap";
import { ProductDetail } from "./ProductDetail";

export const QuickViewProductModal = ({ show, onHide, product }) => {
    return (
        <Modal show={show} onHide={onHide} centered={true} size="lg">
            <Modal.Body>
                <ProductDetail product={product} />
            </Modal.Body>
        </Modal>
    );
};
