import React, {useEffect} from 'react';
import styled from 'styled-components';
import SearchList from "./SearchList";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";


declare global {
    interface Window {
        kakao : any
    }
}
const {kakao} = window


function Map () {

    const {x, y, address_name} = useSelector((state : RootState) => state.common.SelectAddress)


    useEffect(() => {
        var coords = new kakao.maps.LatLng(y, x);
        var container = document.getElementById('map'),
            options = {
                center: coords,
                level: 3
            };

        var map = new kakao.maps.Map(container, options);
        //마커 생성
        var marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });
        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;font-size: 13px">${address_name}</div>`
        });
        infowindow.open(map, marker);


        map.setCenter(coords)
    },[x,y])

    return(
        <Container>
            <KaKaoMap id={'map'}/>
            <SearchList/>
        </Container>
    )
};

const Container = styled.div`
  display: flex;
  margin-bottom: 30px;
`;
const KaKaoMap = styled.div`
  width: 400px;
  height: 500px;
`;
export default Map;
