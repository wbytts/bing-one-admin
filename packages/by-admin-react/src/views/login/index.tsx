import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// 表单字段类型
type FormFields = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();
  // register 用于绑定状态和表单元素
  // handleSubmit 处理提交事件
  // watch 当表单元素变化的时候
  // formState 需要用到的表单状态
  // formState.errors 表单错误信息

  // 表单提交处理函数
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log("errors", errors);
    console.log(data);
  };

  // 监听输入的值
  console.log(watch("username"));
  console.log(watch("password"));

  return (
    <div>
      {/* handleSubmit 处理提交事件 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 注册用户名字段 */}
        <input {...register("username", { required: true })} />
        {/* 如果校验失败, 则显示下方内容 */}
        {errors.username && <span>用户名必填</span>}
        <br />

        {/* 注册密码字段 */}
        <input {...register("password", { required: true })} />
        {errors.password && <span>密码必填</span>}
        <br />

        {/* 提交按钮 */}
        <input type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
