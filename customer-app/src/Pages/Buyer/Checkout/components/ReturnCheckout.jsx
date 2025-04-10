import { useSearchParams } from "react-router-dom";

const ReturnCheckout = () => {

    const [searchParams] = useSearchParams();

    const a = searchParams.get("vnp_TransactionStatus");

    // check parameter secret key..........
    if(a ==="00"){
        // gọi API tạo đơn hàng và direct sang quản lý đơn hàng.......

    }
    
    return (<>
            <div>Đây là trang nhận kết quả trả về {a}</div>
    </>)
}




export default ReturnCheckout;