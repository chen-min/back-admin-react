import { IDetailProp } from "@/types/modal";
import { Modal } from "antd";
import { useImperativeHandle, useState } from "react";
import api from "@/api";
import { Order } from "@/types/api";
import { message } from "@/utils/Message";

export default function OrderMarker(props: IDetailProp) {
  const [visible, setVisible] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [markers, setMarkers] = useState<
    { lng: string; lat: string; id: number }[]
  >([]);
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    };
  });
  const open = async (orderId: string) => {
    setOrderId(orderId);
    setVisible(true);
    const detail = await api.getOrderDetail(orderId);
    renderMap(detail);
  };
  const handleCancel = () => {
    setVisible(false);
    setMarkers([]);
  };
  const renderMap = (detail: Order.OrderItem) => {
    const map = new window.BMapGL.Map("markerMap");
    map.centerAndZoom(detail.cityName, 12);
    var scaleCtrl = new window.BMapGL.ScaleControl(); // 添加比例尺控件
    map.addControl(scaleCtrl);
    var zoomCtrl = new window.BMapGL.ZoomControl(); // 添加缩放控件
    map.enableScrollWheelZoom();
    map.addControl(zoomCtrl);
    detail.route?.map((item) => {
      createMarker(map, item.lng, item.lat);
    });
    // 绑定事件
    map.addEventListener("click", function (e: any) {
      createMarker(map, e.latlng.lng, e.latlng.lat);
    });
  };

  // 创建marker
  const createMarker = (map: any, lng: string, lat: string) => {
    const id = Math.random();
    const marker = new window.BMapGL.Marker(new window.BMapGL.Point(lng, lat));
    markers.push({ lng, lat, id });
    marker.id = id;
    const markerMenu = new window.BMapGL.ContextMenu();
    markerMenu.addItem(
      new window.BMapGL.MenuItem("删除", function () {
        map.removeOverlay(marker);
        const index = markers.findIndex((item) => item.id === marker.id);
        markers.splice(index, 1);
        setMarkers([...markers]);
      })
    );
    setMarkers([...markers]);
    marker.addContextMenu(markerMenu);
    map.addOverlay(marker);
  };
  // 更新打点
  const handleOk = async () => {
    await api.updateOrderInfo({
      orderId,
      route: markers,
    });
    message.success("打点成功");
    handleCancel();
  };
  return (
    <Modal
      title="地图打点"
      width={900}
      open={visible}
      okText="确定"
      cancelText="取消"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div id="markerMap" style={{ height: 500 }}></div>
    </Modal>
  );
}
