import { useEffect, useState } from 'react';
import { PageVo } from 'typings/type';
import { Response } from 'utils/request';

enum ListPropName {
  data = 'data',
  list = 'list'
}
enum PagePropName {
  page = 'page',
  pageVO = 'pageVO',
  pageVo = 'pageVo'
}
export type ListResponse<T> = {
  data: { [listProp in ListPropName]: T[] } &
    { [pageProp in PagePropName]: PageVo };
};
// useFetch 的用法
/**
 * 请求列表的通用逻辑 T:代表列表中每一项的类型； P: 代表参数类型
 * @param api 请求列表的方法 (params: P) => Promise<Response<ListResponse<T>>>,
 * @param params 请求参数
 * @param defaultData 初始值
 */
export default function useFetchList<T, P>(
  api: (params: P) => Promise<Response<ListResponse<T>>>,
  params: P,
  defaultData: T[]
) {
  const [list, setList] = useState<T[]>(defaultData);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PageVo>({
    pageNo: 1,
    pageSize: 20,
    total: 0,
    lastPage: 1
  });
  const [queryParam, setQueryParam] = useState<P>(params);

  useEffect(() => {
    // 获取操作模块的数据
    const fetchList = async (param?: P) => {
      try {
        const queryListParam = param || queryParam;
        const res = await api(queryListParam);
        if (res && res.data) {
          if ('list' in res.data) {
            setList(res.data.list || []);
          } else if ('data' in res.data) {
            setList(res.data.data || []);
          } else {
            setList(res.data.list || res.data.data || []);
          }
          const page = res.data.pageVO || res.data.pageVo || res.data.page;
          const paginationInfo = {
            pageNo: page.pageNo,
            pageSize: page.pageSize,
            total: page.total,
            lastPage: Math.ceil(page.total / page.pageSize)
          };
          setPagination(paginationInfo);
          setLoading(false);
        } else {
          setList([]);
          const paginationInfo = {
            pageNo: 1,
            pageSize: 20,
            total: 0,
            lastPage: 1
          };
          setPagination(paginationInfo);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setList([]);
        const paginationInfo = {
          pageNo: 1,
          pageSize: 20,
          total: 0,
          lastPage: 1
        };
        setPagination(paginationInfo);
        setLoading(false);
      }
    };

  }, [api, queryParam]);

  return [{ queryParam, list, pagination, loading }, setQueryParam] as const;
}

  // 公共请求列表方法
  // const [{ queryParam, list, pagination, loading }, setQueryParam] = useInitial<
  //   RoleInfo,
  //   RequestRoleListParam
  // >(getRoleList, initQueryParam, []);
