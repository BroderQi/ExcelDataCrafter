import { Card, message, Upload } from 'antd';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
const { Dragger } = Upload;
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const ExcelImport: FC<Record<string, any>> = () => {



  return (
    <PageContainer content="Excel文件导入向导">
      <>
        <StepsForm
          onFinish={async (values) => {
            console.log(values);
            await waitTime(1000);
            message.success('提交成功');
          }}
          formProps={{
            validateMessages: {
              required: '此项为必填项',
            },
          }}
        >
          <StepsForm.StepForm
            name="base"
            title="第一步骤"
            onFinish={async () => {
              await waitTime(2000);
              return true;
            }}
          >
            <ProCard
              title="Excel上传"
              bordered
              headerBordered
              collapsible
              style={{
                marginBlockEnd: 16,
                minWidth: 800,
                maxWidth: '100%',
              }}
            >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                  banned files.
                </p>
              </Dragger>
            </ProCard>
          </StepsForm.StepForm>
          <StepsForm.StepForm name="checkbox" title="第二步骤">
            <ProCard
              style={{
                minWidth: 800,
                marginBlockEnd: 16,
                maxWidth: '100%',
              }}
            >
              <ProFormCheckbox.Group
                name="checkbox"
                label="迁移类型"
                width="lg"
                options={['结构迁移', '全量迁移', '增量迁移', '全量校验']}
              />
              <ProForm.Group>
                <ProFormText name="dbname" label="业务 DB 用户名" />
                <ProFormDatePicker
                  name="datetime"
                  label="记录保存时间"
                  width="sm"
                />
              </ProForm.Group>
              <ProFormCheckbox.Group
                name="checkbox"
                label="迁移类型"
                options={['完整 LOB', '不同步 LOB', '受限制 LOB']}
              />
            </ProCard>
          </StepsForm.StepForm>
          <StepsForm.StepForm name="time" title="第三步骤">
            <ProCard
              style={{
                marginBlockEnd: 16,
                minWidth: 800,
                maxWidth: '100%',
              }}
            >
              <ProFormCheckbox.Group
                name="checkbox"
                label="部署单元"
                rules={[
                  {
                    required: true,
                  },
                ]}
                options={['部署单元1', '部署单元2', '部署单元3']}
              />
              <ProFormSelect
                label="部署分组策略"
                name="remark"
                rules={[
                  {
                    required: true,
                  },
                ]}
                width="md"
                initialValue="1"
                options={[
                  {
                    value: '1',
                    label: '策略一',
                  },
                  { value: '2', label: '策略二' },
                ]}
              />
              <ProFormSelect
                label="Pod 调度策略"
                name="remark2"
                width="md"
                initialValue="2"
                options={[
                  {
                    value: '1',
                    label: '策略一',
                  },
                  { value: '2', label: '策略二' },
                ]}
              />
            </ProCard>
          </StepsForm.StepForm>
        </StepsForm>
      </>

    </PageContainer>
  );
};

export default ExcelImport;
