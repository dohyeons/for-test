"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import Button from "@/components/Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("error:", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="flex h-[50vh] w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="text-lg text-mono-11">죄송합니다.</div>
              <div className="text-mono-9">{error?.message ?? "알 수 없는 에러가 발생했습니다."}</div>
            </div>
            <Button styleType={"outline"} onClick={() => this.setState({ hasError: false })} className="w-[120px]">
              다시 시도하기
            </Button>
          </div>
        </div>
      );
    }

    return children;
  }
}
