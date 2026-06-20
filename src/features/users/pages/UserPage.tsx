import PageHeader from '@/shared/components/page/PageHeader';
import FilterTableCustom from '@/shared/components/table/FilterTableCustom';
import { userFilters } from '../constants/user-filter-table';
import { userRoleAdminApi } from '../api/user-api';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useFormModal } from '@/shared/hooks/useFormModal';
import type { User } from '../types/user-type';
import useTable from '@/shared/hooks/useTable';
import type { UserFilterParams } from '../types/user-filter-params-type';
import type { SectionForm } from '@/shared/components/modal/ModalFormCustom';
import { generalInfoFormFields } from '../constants/general-info-form-fields';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { USER_STATUS } from '../types/user-status-type';
import ActionGroup from '@/shared/components/table/ActionGroup';
import StatusTag from '@/shared/components/status/StatusTag';
import { FORMAT_DATE_TIME } from '@/shared/constants/format-date';
import { formatDate } from '@/shared/utils/date';
import TablePaginationCustom from '@/shared/components/table/TablePaginationCustom';
import ModalFormCustom from '@/shared/components/modal/ModalFormCustom';
import { FormModalMode } from '@/shared/types/form-modal-mode-type';
import { getMeThunk } from '@/features/auth/store/auth-thunk';

const UserPage = () => {
  const { getAll, update, active, inActive, remove } = userRoleAdminApi;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { open, mode, selectedRecord, openView, openEdit, close } = useFormModal<User>();
  const {
    data: users,
    loading,
    pagination,
    filterValues,
    handleFilterChange,
    handleFilterSubmit,
    handleFilterReset,
    handleChangePage,
    handleDelete,
    handleActive,
    handleInActive,
    refetch,
  } = useTable<User, UserFilterParams>({
    fetchApi: getAll,
    removeApi: remove,
    activeApi: active,
    inActiveApi: inActive,
  });

  const sectionsUserForm: SectionForm<User>[] = [
    {
      key: 'general',
      label: 'Thông tin chung',
      fields: generalInfoFormFields,
    },
  ];

  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
    },

    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: 'Vai trò',
      dataIndex: 'role',
    },

    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },

    {
      title: 'Giới tính',
      dataIndex: 'gender',
    },

    {
      title: 'Địa chỉ',
      dataIndex: 'address',
    },

    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      render: (dateOfBirth: string) => {
        return formatDate(dateOfBirth);
      },
    },

    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (createdAt: string) => {
        return formatDate(createdAt);
      },
    },

    {
      title: 'Đăng nhập gần nhất',
      dataIndex: 'lastLoginAt',
      render: (lastLoginAt: string) => {
        return formatDate(lastLoginAt, FORMAT_DATE_TIME);
      },
    },

    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center' as const,
      render: (_: any, record: any) => {
        return <StatusTag status={record.status} statusText={record.statusText} />;
      },
    },

    {
      title: 'Tác vụ',
      align: 'center' as const,
      render: (_: any, record: User) => {
        return (
          <ActionGroup<User>
            record={record}
            actions={[
              {
                show: () => true,
                icon: <EyeOutlined />,
                tooltip: 'Chi tiết',
                onClick: openView,
              },
              {
                show: (r) => r.status !== USER_STATUS.DELETED,
                icon: <EditOutlined />,
                tooltip: 'Sửa',
                onClick: openEdit,
              },

              {
                show: (r) => r.status === USER_STATUS.ACTIVE,
                icon: <CloseOutlined />,
                tooltip: 'Tạm ngưng',
                danger: true,
                onClick: () => handleInActive(record.id),
                isPopconfirm: true,
              },

              {
                show: (r) => r.status === USER_STATUS.INACTIVE,
                icon: <CheckOutlined />,
                tooltip: 'Kích hoạt',
                color: '#52c41a',
                onClick: () => handleActive(record.id),
                isPopconfirm: true,
              },

              {
                show: (r) => r.status === USER_STATUS.INACTIVE,
                icon: <DeleteOutlined />,
                tooltip: 'Xóa',
                danger: true,
                onClick: () => handleDelete(record.id),
                isPopconfirm: true,
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Quản lý tài khoản" subtitle="Danh sách tài khoản" />

      <div className="flex-1 flex flex-col gap-4">
        <FilterTableCustom
                dataFilters={userFilters}
                values={filterValues}
                onChange={handleFilterChange}
                onReset={handleFilterReset}
                onSubmit={handleFilterSubmit}
            />

            <TablePaginationCustom<User>
                columns={columns}
                data={users}
                loading={loading}
                pagination={pagination}
                onChangePage={handleChangePage}
            />

            <ModalFormCustom<User>
            open={open}
            title="Học Viên"
            mode={mode}
            initialValues={selectedRecord}
            disabled={mode === FormModalMode.VIEW}
            onCancel={close}
            onSuccess={() => {
            refetch();
            if (mode === FormModalMode.EDIT && selectedRecord?.id === user?.id) {
                dispatch(getMeThunk());
            }
            }}
            onSubmit={
            mode === FormModalMode.CREATE ? undefined : (values) => update(selectedRecord!.id, values)
            }
            sections={sectionsUserForm}
        />
      </div>
    </div>
  );
};

export default UserPage;
