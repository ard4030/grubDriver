"use client"
import { fetchData } from '@/utils/functions';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Table } from 'antd'
import {useState,useEffect} from 'react'
import CommonlyUsedComponents from './DatePic';
import stylesMe from "./MyTable.module.css"
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
const dateFormat = 'YYYY-MM-DD H:m';

const TableView = ({columns,api,method,styles,refresh=false,dataSet=false,dataSetMethod,fromdt,todt}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: 10,
        },
    });

    const getNowDate = () => {
      var currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = (currentDate.getMonth() + 1);
      let day = currentDate.getDate();
      let hourse = currentDate.getHours();
      let min = currentDate.getMinutes();
      let finall = `${year}-${month<10?0:""}${month}-${day<10?0:""}${day} ${hourse<10?0:""}${hourse}:${min<10?0:""}${min}`
      return finall
    }

    const [filters,setFilters] = useState({
      sortby:"date_created",
      fromdt:fromdt?fromdt:"2023-02-24 13:38",
      todt:todt?todt:getNowDate()
    })



    const getData = async () => {
        let x = {};
        const y = getRandomuserParams(tableParams);
        x.perpage = parseInt(y.results);
        x.page = parseInt(y.page);
        x.sortby = filters.sortby
        x.fromdt = filters.fromdt;
        x.status = "all";
        x.todt = filters.todt;

        setLoading(true);
        const res = await fetchData(api,'POST',x);
        if(dataSet){
          dataSetMethod(res)
        }
        
        setLoading(false);
        if(res.success){
          if(res.data.code === 1){
            let x = [];
            res.data.details.rows.forEach((item,index) => {
              if(fromdt && todt){
                if(item.status === "complete"){
                  x.push({...item,key:index+1})
                }
              }else{
                  x.push({...item,key:index+1})
              }
              
            });
            setData(x)
          }else{
            setData([])
              // alert(data.error)
          }  
        }
           
    }

    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
          pagination,
          filters,
          ...sorter,
        });
    
        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
          setData([]);
        }
    };

    const changeData = (e) => {
      if(e){
        let from = `${e[0].$y}-${parseInt(e[0].$m) < 10 ? 0:""}${e[0].$m}-${parseInt(e[0].$D) < 10 ? 0:""}${e[0].$D} ${parseInt(e[0].$H) < 10 ? 0:""}${e[0].$H}:${parseInt(e[0].$M) < 10 ? 0:""}${e[0].$M}`
        let to = `${e[1].$y}-${parseInt(e[1].$m) < 10 ? 0:""}${e[1].$m}-${parseInt(e[1].$D) < 10 ? 0:""}${e[1].$D} ${parseInt(e[1].$H) < 10 ? 0:""}${e[1].$H}:${parseInt(e[1].$M) < 10 ? 0:""}${e[1].$M}`
        setFilters({...filters,fromdt:from,todt:to})
      }
    }

    useEffect(() => {
        getData()
    }, [filters,refresh])
    
 

  return (
    <div className='tblView'>
      <div className={stylesMe.headTable}>
        <FormControl >
          <InputLabel size='small' id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            size='small'
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filters.sortby}
            label="Sort By"
            style={{background:"#fff",marginRight:"10px"}}
            onChange={(e) => setFilters({...filters,sortby:e.target.value})}
          >
            <MenuItem value={"date_created"}>Data Time</MenuItem>
            <MenuItem value={"status"}>Status</MenuItem>
          </Select>
        </FormControl>

        {/* <Button 
        size='small'
        style={{background:"#0a99ff"}}
        variant="contained">Filter</Button> */}

        {/* <input 
        type={"date"} />

        <input type={"date"}/> */}
        <RangePicker 
        onChange={changeData}
        // defaultValue={[filters.fromdt,filters.todt]}
        defaultValue={[dayjs(filters.fromdt, dateFormat), dayjs(filters.todt, dateFormat)]}
        value={[dayjs(filters.fromdt, dateFormat), dayjs(filters.todt, dateFormat)]}
        format={dateFormat}
        showTime />
        
      </div>


      <Table 
      columns={columns} 
      dataSource={data} 
      pagination={tableParams.pagination}
      onChange={handleTableChange}
      loading={loading}
      direction={"rtl"}
      style={styles}
      />
    </div>
    // <div>table</div>
  )
}

export default TableView