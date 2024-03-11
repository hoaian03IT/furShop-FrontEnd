import axios from "axios";
async function VirtualAssistant(input = "") {
    let name, color, res;
    if (input.includes("sản phẩm")) {
        name = input.split("sản phẩm")[1];
    }
    res = await axios.get(`/api/san-pham/loc-san-pham?query=${name.trim()}`);
    console.log("name", name);
    // if (res.data.length > 0) {
    // }
    return { message: "Đây là một số sản phẩm mà bạn đang tìm ", product: res };
}

export { VirtualAssistant };
