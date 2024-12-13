import { useRequest } from 'ahooks';
import { List, Avatar, Row, Col, Statistic, Badge, Button, Space } from 'antd';
import http from './http';
import { WifiOutlined, PauseCircleOutlined } from '@ant-design/icons';
import StopSvg from './assets/stop.svg?react';
import LogoSvg from './assets/logo.svg?react';
import './App.css';

const App = () => {


  const { data: myIp, } = useRequest(() => {
    return http.get('/proxy/ipauthorization/whatsmyip/')
  })

  const { data: proxyList, loading, error } = useRequest<{
    data: {
      count: number;
      next: string | null;
      previous: string | null;
      results: {
        id: string;
        username: string;
        password: string;
        proxy_address: string;
        port: number;
        valid: boolean;
        last_verification: string;
        country_code: string;
        city_name: string;
        created_at: string;
      }[];
    }
  }, any[]>(() => {
    return http.get('/proxy/list/?mode=direct&page=1&page_size=25')
  }, {
    cacheKey: 'proxyList',
    staleTime: 1000 * 60 * 60,
  })

  return (
    <div className="content">
      <h1><LogoSvg width={40} height={40} />InProxy</h1>
      <div className='user-status'>
        <Space>
          <Button type='default' icon={<WifiOutlined />} />
          <Button
            type='primary'
            danger
            disabled
            icon={<PauseCircleOutlined />} />
        </Space>
        <div>我的ip : {myIp?.data?.ip_address}</div>

      </div>

      <div className='list-proxy'>
        <List
          itemLayout="horizontal"
          dataSource={proxyList?.data?.results}
          renderItem={(item) => {
            return (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={item.city_name}
                  description={
                    <div>
                      <div>{item.proxy_address}:{item.port}</div>
                    </div>
                  }
                />
                <div>{
                  item.valid ?
                    <Badge status="success" text="可用" /> :
                    <Badge status="error" text="错误" />
                }</div>
                <div style={{ marginLeft: 15 }}>
                  <Button type="primary" disabled={!item.valid}>连接</Button>
                </div>
              </List.Item>
            )
          }}
        />
      </div>
    </div>
  );
};

export default App;
