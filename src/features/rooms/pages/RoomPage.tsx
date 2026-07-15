import { useFormModal } from "@/shared/hooks/useFormModal";
import { roomsRoleAdminApi } from "../api/room-api";
import type { Room } from "../types/room-type";
import useTable from "@/shared/hooks/useTable";
import type { RoomFilterParams } from "../types/room-filter-params-type";
import type { SectionForm } from "@/shared/components/modal/ModalFormCustom";
import { roomFormFields } from "../constants/room-form-fields";
import ActionGroup from "@/shared/components/table/ActionGroup";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import PageHeader from "@/shared/components/page/PageHeader";
import { Button } from "antd";
import FilterTableCustom from "@/shared/components/table/FilterTableCustom";
import { roomFilters } from "../constants/room-filter-table";
import TablePaginationCustom from "@/shared/components/table/TablePaginationCustom";
import ModalFormCustom from "@/shared/components/modal/ModalFormCustom";
import { FormModalMode } from "@/shared/types/form-modal-mode-type";

const RoomPage = () => {
    const { getAll, create, update, remove } = roomsRoleAdminApi;

    const { open, mode, selectedRecord, openCreate, openView, openEdit, close } = useFormModal<Room>();

    const {
        data: rooms,
        loading,
        pagination,
        filterValues,
        handleFilterChange,
        handleFilterSubmit,
        handleFilterReset,
        handleChangePage,
        handleDelete,
        refetch,
    } = useTable<Room, RoomFilterParams>({
        fetchApi: getAll,
        removeApi: remove,
    });

    const sectionsRoomForm: SectionForm[] = [
        {
            key: 'room',
            label: 'Thông tin phòng học',
            fields: roomFormFields,
        },
    ];

    const columns = [
        {
            title: 'Mã phòng',
            dataIndex: 'roomCode',
        },
        {
            title: 'Tên phòng',
            dataIndex: 'name',
        },
        {
            title: 'Sức chứa',
            dataIndex: 'capacity',
            align: 'center' as const,
        },
        {
            title: 'Tác vụ',
            align: 'center' as const,
            render: (_: any, record: Room) => {
                return (
                    <ActionGroup<Room>
                        record={record}
                        actions={[
                            {
                                show: () => true,
                                icon: <EyeOutlined />,
                                tooltip: 'Chi tiết',
                                onClick: openView,
                            },
                            {
                                show: () => true,
                                icon: <EditOutlined />,
                                tooltip: 'Sửa',
                                onClick: openEdit,
                            },
                            {
                                show: () => true,
                                icon: <DeleteOutlined />,
                                tooltip: 'Xóa',
                                danger: true,
                                onClick: () => handleDelete(record.id),
                                isPopconfirm: true,
                            }
                        ]}
                    />
                );
            }
        }
    ];
  return (
    <div className="flex flex-col h-full">
        <PageHeader
            title="Quản lý phòng học"
            subtitle="Danh sách phòng học"
            extra={
                <Button type="primary" onClick={openCreate}>
                    + Thêm phòng học
                </Button>
            }
        />

        <div className="mb-4">
            <FilterTableCustom
                dataFilters={roomFilters}
                values={filterValues}
                onChange={handleFilterChange}
                onSubmit={handleFilterSubmit}
                onReset={handleFilterReset}
            />
        </div>

        <TablePaginationCustom<Room>
            columns={columns}
            data={rooms}
            loading={loading}
            pagination={pagination}
            onChangePage={handleChangePage}
        />

        <ModalFormCustom<Room>
            open={open}
            title="Phòng học"
            mode={mode}
            initialValues={selectedRecord}
            disabled={mode === FormModalMode.VIEW}
            onCancel={close}
            onSuccess={refetch}
            onSubmit={mode === FormModalMode.CREATE ? create : (values) =>  update(selectedRecord!.id, values)}
            sections={sectionsRoomForm}
        />
    </div>
  )
}

export default RoomPage