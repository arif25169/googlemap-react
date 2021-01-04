import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    InputNumber,
    List,
    Popconfirm,
    Row,
    Tooltip,
    Upload,
} from "antd";
import GoogleMapReact from "google-map-react";
import Marker from "../components/Marker";
import React, { useState } from "react";
import { staticImage } from "../components/img";
import { v4 as uuidv4 } from "uuid";


export default function StepOne() {
    const [form] = Form.useForm();
    const [gridData, setgridData] = useState<any>([
        {
            id: "2d56206c-e67c-4c22-a7d6-3968103738bc",
            label: "Toyota",
            latitude: 23.75089883064122,
            longitude: 90.40240252227576,
            img: staticImage,
        },
        {
            id: "2d56206c-e67c-4c22-a7d6-3968103738bd",
            label: "BMW",
            latitude: 23.75376628544297,
            longitude: 90.40450537425251,
            img: staticImage,
        },
    ]);
    const [imageData, setimageData] = useState<any>("");
    const [fileList, updateFileList] = useState([]);
    const [center, setCenter] = useState({ lat: 23.75089883064122, lng: 90.40240252227576 });
    const [zoom] = useState(15);
    // const [zoom, setZoom] = useState(11);


    const onselectItem = (value) => {
        console.log(value);
        setCenter({ lat: value.latitude, lng: value.longitude });
    };

    const uploadProps = {
        fileList,
        multiple: false,
        onChange: (info) => {
            Image2Base64(info.fileList[0]?.originFileObj);
            updateFileList(info.fileList.filter((file) => !!file.status));
        },
    };

    const Image2Base64 = (e) => {
        let file = e;
        if (file) {
            const reader: any = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setimageData(reader.result);
            };
        }
    };

    const onFinish = (e) => {
        let newItem = {
            id: uuidv4(),
            label: e.label,
            latitude: e.latitude,
            longitude: e.longitude,
            img: imageData,
        };
        const newData = [...gridData];
        setgridData(newData.concat(newItem));
        form.resetFields();
        updateFileList([]);
        setimageData("");
    };

    const delItem = (e) => {
        let data = gridData.filter((item) => item.id !== e);
        setgridData(data);
    };

    const getMapOptions = (maps: any) => {
        return {
            disableDefaultUI: true,
            mapTypeControl: true,
            streetViewControl: true,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "on" }],
                },
            ],
        };
    };

    return (
        <>
            <Form layout={"horizontal"} form={form} onFinish={onFinish}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                            label="Label"
                            name="label"
                            rules={[{ required: true, message: "Please write a label" }]}
                        >
                            <Input
                                placeholder="Write Label"
                                style={{ width: "100%" }}
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                            name="image"
                            rules={[{ required: true, message: "Please insert a Image" }]}
                        >
                            <Upload {...uploadProps}>
                                <Button icon={<UploadOutlined />}>Upload Image</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                            label="Latitude"
                            name="latitude"
                            rules={[
                                { required: true, message: "Please insert latitude value" },
                            ]}
                        >
                            <InputNumber placeholder="Latitude" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                            label="Longitude"
                            name="longitude"
                            rules={[
                                { required: true, message: "Please insert longitude value" },
                            ]}
                        >
                            <InputNumber placeholder="Longitude" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add
          </Button>
                </Form.Item>
            </Form>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <List
                        header={<div>Total item {gridData.length}</div>}
                        itemLayout="vertical"
                        size="large"
                        grid={{ gutter: 8, column: 3 }}
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={gridData}
                        renderItem={(item: any) => (
                            <List.Item key={item.id}>
                                <Card>
                                    <div className="itemBox">
                                        <div className="deleteItem">
                                            <Popconfirm
                                                title="Are you sure to delete?"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => delItem(item.id)}
                                            >
                                                <Tooltip title="Delete">
                                                    <DeleteOutlined />
                                                </Tooltip>
                                            </Popconfirm>
                                        </div>
                                        <div className="itemBox2">
                                            <Tooltip title="View In Google Map">
                                                <div
                                                    style={{ cursor: "pointer" }}
                                                    onClick={(e) => onselectItem(item)}
                                                >
                                                    <img
                                                        src={item.img}
                                                        alt="Car"
                                                        style={{ width: 115, height: 140 }}
                                                    />
                                                </div>
                                            </Tooltip>
                                            <div className="itemName">
                                                <span key={item.id}>{item.label}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div style={{ height: "70vh", width: "100%" }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                key: "GOOGLE_API_USE_ENV",
                            }}
                            defaultCenter={center}
                            center={center}
                            defaultZoom={zoom}
                            options={getMapOptions}
                        >
                            {gridData.map((place) => (
                                <Marker
                                    key={place.id}
                                    text={place.label}
                                    lat={place.latitude}
                                    lng={place.longitude}
                                    mapImage={place.img}
                                    lati={place.latitude}
                                    longi={place.longitude}
                                    name={place.label}
                                    color="blue"
                                />
                            ))}
                        </GoogleMapReact>
                    </div>
                </Col>
            </Row>
        </>
    );
}
