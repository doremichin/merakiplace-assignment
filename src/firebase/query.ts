import { collection, getDocs } from "firebase/firestore";
import {db} from "./firebase";
import {setCurrentAddress} from "../redux/address/slice";
import {store} from "../redux/store";

export const getAddressCollection = async () => {
    const querySnapshot = await getDocs(collection(db, "address"));
    const result : any[] = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        const docItem = {
            id : doc.id,
            ...doc.data()
        }
        result.push(docItem)
    });
    store.dispatch(setCurrentAddress(result))

    return result
}


