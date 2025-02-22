import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '../components/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setJobLoading } from '@/redux/jobSlice'

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        dispatch(setJobLoading(true));
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }finally{
        dispatch(setJobLoading(false));
      }
    };

    fetchAllJobs(); // Fetch jobs when component mounts or when searchedQuery changes
  }, [searchedQuery, dispatch]); // Ensure the fetch triggers when searchedQuery changes
};

export default useGetAllJobs;
