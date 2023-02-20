import { IDetailProp } from "@/types/modal";
import { Modal } from "antd";
import { useImperativeHandle, useState } from "react";
import api from "@/api";
import { message } from "@/utils/Message";
import { Order } from "@/types/api";

export default function OrderRoute(props: IDetailProp) {
  const [visible, setVisible] = useState(false);
  const [trackAni, setTrackAni] = useState<{
    cancel: () => void;
  }>();
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    };
  });

  const open = async (orderId: string) => {
    const detail = await api.getOrderDetail(orderId);
    if (detail.route.length > 0) {
      setVisible(true);
      setTimeout(() => {
        renderMap(detail);
      });
    } else {
      message.info("请先完成打点上报");
    }
  };

  const renderMap = (detail: Order.OrderItem) => {
    const map = new window.BMapGL.Map("orderRouteMap");
    map.enableScrollWheelZoom();
    map.centerAndZoom(detail.cityName, 17);

    const path = detail.route || [];
    var point = [];
    for (var i = 0; i < path.length; i++) {
      point.push(new window.BMapGL.Point(path[i].lng, path[i].lat));
    }

    const polyline = new window.BMapGL.Polyline(point, {
      strokeWeight: "6",
      strokeOpacity: 0.6,
      strokeColor: "#007aed",
    });

    setTimeout(start, 1000);
    function start() {
      const trackAni = new window.BMapGLLib.TrackAnimation(map, polyline, {
        overallView: true,
        tilt: 30,
        duration: 20000,
        delay: 300,
      });
      trackAni.start();
      setTrackAni(trackAni);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    trackAni?.cancel();
  };
  return (
    <Modal
      title="轨迹"
      width={1100}
      open={visible}
      footer={false}
      onCancel={handleCancel}
    >
      <div id="orderRouteMap" style={{ height: 500 }}></div>
    </Modal>
  );
}
