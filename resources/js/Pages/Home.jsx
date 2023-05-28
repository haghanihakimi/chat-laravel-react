import { Head, Link } from '@inertiajs/react';
import Layout from '../Layouts/General'
import route from 'ziggy-js';
import Login from '../Pages/Auth/Login'

import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import axios from 'axios';
import { useGetMessages } from '../store/actions/messages';
import { useSelector } from 'react-redux';


export default function({}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreData = async (startIndex, stopIndex) => {
    setIsLoading(true);

    try {
      // Make Axios API request to fetch data
      const response = await axios.get(route('get.messages', { username: 'u0gqtl12wo' }), {
        params: { startIndex, stopIndex },
      });
      const paginator = response.data.messages; // Assuming response.data.messages is a Paginator instance
      const newData = paginator.data; // Extract the actual array of messages from the Paginator object

      setData((prevData) => [...prevData, ...newData]);
      setIsLoading(false);
      setHasMore(newData.length > 0); // Check if there is more data to load
    } catch (error) {
      console.error('Error loading data:', error);
      setIsLoading(false);
    }
  };

  const isItemLoaded = (index) => !!data[index]; // Check if data for an item has been loaded

  const itemCount = hasMore ? data.length + 1 : data.length; // Add extra item for loading indicator

  const rowRenderer = ({ index, style }) => {
    if (!isItemLoaded(index)) {
      return <div style={style}>Loading...</div>;
    }
  
    const item = data[index];
  
    return (
      <div style={style}>{item.sender_id}</div>
      // Replace {item.sender_id} with your desired rendering logic for each item
    );
  };

  return (
    <InfiniteLoader
  isItemLoaded={isItemLoaded}
  itemCount={itemCount}
  loadMoreItems={loadMoreData}
>
  {({ onItemsRendered, ref }) => (
    <List
      height={800} // Adjust the height as needed
      itemCount={itemCount}
      itemSize={50} // Adjust the item size as needed
      onItemsRendered={onItemsRendered}
      ref={ref}
      width="100%"
    >
      {rowRenderer}
    </List>
  )}
</InfiniteLoader>
  );
} 

