import { useState } from "react";

import "../components/widgets/widgets.css";
import "./OperationsPanel.css";

import {
  InfoWidget,
  StatusWidget,
} from "../components/widgets";

import {
  createDocument,
} from "../document-management/stores/DocumentStore";

import {
  sendTaskToSecretary,
} from "../services/aiSecretaryService";

import WorkFlowSteps from "./WorkFlowSteps";
import WorkOrderInput from "./WorkOrderInput";
import TodayWorkBoard from "./TodayWorkBoard";
import WorkOrderList from "./WorkOrderList";


const initialWorkOrders = [
  {
    id: "WO-001",
    title: "GGUDDONG HQ 핵심 기능 기준 정리",
    content:
      "GGUDDONG HQ 핵심 기능 기준을 정리한다.",
    status: "접수",
    priority: "최우선",
    owner: "AI SECRETARY",
    targetCenter: "HQ",
    createdAt: "2026. 07. 02. 19:00",
  },
  {
    id: "WO-002",
    title: "작업지시서 등록 시스템 준비",
    content:
      "작업지시서 등록 시스템을 준비한다.",
    status: "분석",
    priority: "높음",
    owner: "AI DIRECTOR",
    targetCenter: "AI DIRECTOR",
    createdAt: "2026. 07. 02. 19:10",
  },
];


/**
 * 현재 날짜/시간 생성
 */
function createDateTimeString() {
  return new Date().toLocaleString(
    "ko-KR",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );
}


/**
 * 작업지시서 제목 추출
 *
 * 우선순위
 *
 * 1. ■ 작업명
 * 2. ■ 제목
 * 3. 제목
 * 4. 첫 번째 의미 있는 문장
 */
function createWorkOrderTitle(content) {
  const lines = String(content ?? "")
    .split("\n")
    .map((line) => line.trim());


  const titleHeaders = [
    "■ 작업명",
    "■ 제목",
    "작업명",
    "제목",
  ];


  for (const header of titleHeaders) {
    const headerIndex =
      lines.findIndex(
        (line) => line === header
      );


    if (headerIndex < 0) {
      continue;
    }


    for (
      let index = headerIndex + 1;
      index < lines.length;
      index += 1
    ) {
      const line = lines[index];


      if (!line) {
        continue;
      }


      if (
        line.startsWith("■") ||
        /^=+$/.test(line)
      ) {
        break;
      }


      return line.slice(0, 60);
    }
  }


  const firstMeaningfulLine =
    lines.find((line) => {
      if (!line) {
        return false;
      }


      if (/^=+$/.test(line)) {
        return false;
      }


      if (/^-+$/.test(line)) {
        return false;
      }


      if (
        line.startsWith("[") &&
        line.endsWith("]")
      ) {
        return false;
      }


      if (line.startsWith("■")) {
        return false;
      }


      return true;
    });


  return (
    firstMeaningfulLine?.slice(0, 60) ||
    "새 작업지시서"
  );
}


/**
 * AI 상태
 * → AI OS 화면 상태 변환
 */
function normalizeSecretaryStatus(status) {
  const normalizedStatus =
    String(status ?? "")
      .trim()
      .toUpperCase();


  const statusMap = {

    WAITING:
      "접수",

    RECEIVED:
      "접수",

    ACCEPTED:
      "접수",

    CLASSIFIED:
      "분류완료",

    ROUTED:
      "전달완료",

    DISPATCHED:
      "전달완료",

    ANALYZING:
      "분석",

    PROCESSING:
      "진행중",

    RUNNING:
      "진행중",

    GENERATED:
      "검수대기",

    REVIEW_REQUIRED:
      "검수대기",

    APPROVAL_REQUIRED:
      "검수대기",

    COMPLETED:
      "완료",

    SUCCESS:
      "완료",

    ERROR:
      "오류",

    FAILED:
      "오류",

  };


  return (
    statusMap[normalizedStatus] ||
    status ||
    "접수"
  );
}


/**
 * 담당 센터 정규화
 */
function normalizeTargetCenter(
  targetCenter
) {
  const normalizedTarget =
    String(
      targetCenter ?? ""
    ).trim();


  return (
    normalizedTarget ||
    "AI SECRETARY"
  );
}


/**
 * 객체 내부에서
 * CONTENT CENTER 응답 탐색
 */
function findContentCenterResponse(
  value,
  visited = new WeakSet()
) {

  if (
    !value ||
    typeof value !== "object"
  ) {
    return null;
  }


  if (
    visited.has(value)
  ) {
    return null;
  }


  visited.add(value);


  const from =
    String(
      value.from ?? ""
    )
      .trim()
      .toUpperCase();


  const service =
    String(
      value.service ?? ""
    )
      .trim()
      .toUpperCase();


  if (
    from ===
      "GGUDDONG_CONTENT_CENTER" ||
    service ===
      "GGUDDONG_CONTENT_CENTER"
  ) {

    return value;

  }


  for (
    const childValue
    of Object.values(value)
  ) {

    const found =
      findContentCenterResponse(
        childValue,
        visited
      );


    if (found) {
      return found;
    }

  }


  return null;
}


/**
 * 객체 내부에서
 * AI DIRECTOR 응답 탐색
 */
function findDirectorResponse(
  value,
  visited = new WeakSet()
) {

  if (
    !value ||
    typeof value !== "object"
  ) {
    return null;
  }


  if (
    visited.has(value)
  ) {
    return null;
  }


  visited.add(value);


  const service =
    String(
      value.service ?? ""
    )
      .trim()
      .toUpperCase();


  if (
    service ===
    "GGUDDONG_AI_DIRECTOR"
  ) {

    return value;

  }


  for (
    const childValue
    of Object.values(value)
  ) {

    const found =
      findDirectorResponse(
        childValue,
        visited
      );


    if (found) {
      return found;
    }

  }


  return null;
}


/**
 * 최종 업무 처리 결과 추출
 */
function extractFinalTaskResult(
  secretaryResponse
) {

  /**
   * CONTENT CENTER 응답 탐색
   */
  const contentCenterResponse =
    findContentCenterResponse(
      secretaryResponse
    );


  /**
   * AI DIRECTOR 응답 탐색
   */
  const directorResponse =
    findDirectorResponse(
      secretaryResponse
    );


  /**
   * ===================================================
   * CONTENT CENTER 처리 완료
   * ===================================================
   */
  if (contentCenterResponse) {

    const contentResult =
      contentCenterResponse.result ||
      null;


    /**
     * 대표 승인 필요 여부
     */
    const approvalRequired =
      contentResult
        ?.approvalRequired === true;


    /**
     * 콘텐츠는 생성 완료되어도
     * 대표 승인이 필요하면 검수대기 처리
     */
    const finalStatus =
      approvalRequired
        ? "APPROVAL_REQUIRED"
        : (
            contentCenterResponse
              .status ||
            "COMPLETED"
          );


    return {

      status:
        normalizeSecretaryStatus(
          finalStatus
        ),

      responseStatus:
        finalStatus,

      targetCenter:
        "GGUDDONG_CONTENT_CENTER",

      owner:
        "GGUDDONG_CONTENT_CENTER",

      message:
        approvalRequired
          ? "CONTENT CENTER 콘텐츠 제작 완료 · 대표 검수 대기"
          : (
              contentCenterResponse
                .message ||
              "CONTENT CENTER 업무 처리 완료"
            ),

      contentResult:
        contentResult,

      approvalRequired:
        approvalRequired,

    };

  }


  /**
   * ===================================================
   * AI DIRECTOR까지만 처리된 경우
   * ===================================================
   */
  if (directorResponse) {

    const directorStatus =
      directorResponse.status ||
      secretaryResponse.status ||
      "ROUTED";


    const routedCenter =
      directorResponse
        ?.result
        ?.route
        ?.targetCenter;


    const normalizedCenter =
      normalizeTargetCenter(
        routedCenter ||
        secretaryResponse.targetCenter
      );


    return {

      status:
        normalizeSecretaryStatus(
          directorStatus
        ),

      responseStatus:
        directorStatus,

      targetCenter:
        normalizedCenter,

      owner:
        normalizedCenter,

      message:
        directorResponse.message ||
        secretaryResponse.message ||
        "",

      contentResult:
        null,

      approvalRequired:
        false,

    };

  }


  /**
   * ===================================================
   * SECRETARY 기본 응답
   * ===================================================
   */
  const fallbackStatus =
    secretaryResponse.status ||
    secretaryResponse
      .responseStatus;


  const fallbackCenter =
    normalizeTargetCenter(
      secretaryResponse
        .targetCenter
    );


  return {

    status:
      normalizeSecretaryStatus(
        fallbackStatus
      ),

    responseStatus:
      fallbackStatus ||
      "",

    targetCenter:
      fallbackCenter,

    owner:
      fallbackCenter,

    message:
      secretaryResponse.message ||
      "",

    contentResult:
      null,

    approvalRequired:
      false,

  };

}


/**
 * 콘텐츠 결과 문서 문자열 생성
 */
function createContentResultText(
  contentResult
) {

  if (!contentResult) {
    return "";
  }


  return [

    "■ CONTENT CENTER 처리 결과",

    "",

    `패키지 ID: ${
      contentResult.packageId ||
      "-"
    }`,

    `사업부: ${
      contentResult.division ||
      "-"
    }`,

    `메인 주제: ${
      contentResult.mainTheme ||
      "-"
    }`,

    "",

    `블로그 제목: ${
      contentResult.blogTitle ||
      "-"
    }`,

    `블로그 상태: ${
      contentResult.blogStatus ||
      "-"
    }`,

    "",

    `공지 제목: ${
      contentResult.noticeTitle ||
      "-"
    }`,

    `공지 상태: ${
      contentResult.noticeStatus ||
      "-"
    }`,

    "",

    `저장 상태: ${
      contentResult.saveStatus ||
      "-"
    }`,

    `대표 승인 필요: ${
      contentResult.approvalRequired === true
        ? "예"
        : "아니오"
    }`,

  ].join("\n");

}


function OperationsPanel() {

  const [
    workOrders,
    setWorkOrders,
  ] = useState(
    initialWorkOrders
  );


  const [
    lastMessage,
    setLastMessage,
  ] = useState("");


  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);


  /**
   * 작업지시서 등록
   */
  async function handleAddWorkOrder(
    content
  ) {

    const normalizedContent =
      String(
        content ?? ""
      ).trim();


    if (!normalizedContent) {

      setLastMessage(
        "작업지시서 내용을 입력해 주세요."
      );


      return false;

    }


    if (isSubmitting) {

      setLastMessage(
        "AI SECRETARY가 작업지시서를 접수 중입니다."
      );


      return false;

    }


    setIsSubmitting(
      true
    );


    setLastMessage(
      "AI SECRETARY에 작업지시서를 전달하고 있습니다."
    );


    try {

      /**
       * AI SECRETARY 호출
       */
      const secretaryResponse =
        await sendTaskToSecretary(

          normalizedContent,

          "CEO"

        );


      console.log(

        "AI SECRETARY FULL RESPONSE",

        secretaryResponse

      );


      /**
       * 접수 실패
       */
      if (
        !secretaryResponse
          ?.success
      ) {

        throw new Error(

          secretaryResponse
            ?.message ||

          "AI SECRETARY 업무 접수에 실패했습니다."

        );

      }


      const createdAt =
        createDateTimeString();


      const title =
        createWorkOrderTitle(
          normalizedContent
        );


      const taskId =

        secretaryResponse.taskId ||

        `TEMP-${Date.now()}`;


      /**
       * 최종 처리 결과 분석
       */
      const finalResult =
        extractFinalTaskResult(
          secretaryResponse
        );


      /**
       * 작업 카드 생성
       */
      const nextOrder = {

        id:
          taskId,

        title:
          title,

        content:
          normalizedContent,

        status:
          finalResult.status,

        priority:
          "보통",

        owner:
          finalResult.owner,

        targetCenter:
          finalResult.targetCenter,

        createdAt:
          createdAt,

        secretaryMessage:
          secretaryResponse
            .message ||
          "",

        finalMessage:
          finalResult.message,

        responseStatus:
          finalResult
            .responseStatus,

        contentResult:
          finalResult
            .contentResult,

        approvalRequired:
          finalResult
            .approvalRequired,

      };


      /**
       * 화면 작업 목록 추가
       */
      setWorkOrders(
        (
          currentWorkOrders
        ) => [

          nextOrder,

          ...currentWorkOrders,

        ]
      );


      /**
       * CONTENT CENTER 결과 문자열
       */
      const contentResultText =
        createContentResultText(

          finalResult
            .contentResult

        );


      /**
       * 문서관리 자동 기록
       */
      createDocument({

        category:
          "업무보고",

        title:
          `[업무 처리] ${title}`,

        status:
          finalResult.status,

        author:
          finalResult.owner,

        content:
          [

            "■ 업무 처리 정보",

            "",

            `작업번호: ${taskId}`,

            `접수일시: ${createdAt}`,

            `현재상태: ${
              finalResult.status
            }`,

            `요청자: ${
              secretaryResponse
                .requestedBy ||
              "CEO"
            }`,

            `최종 담당: ${
              finalResult
                .targetCenter
            }`,

            `응답 상태: ${
              finalResult
                .responseStatus ||
              "-"
            }`,

            "",

            "■ 대표 작업지시",

            "",

            normalizedContent,

            "",

            "■ AI 처리 결과",

            "",

            finalResult.message ||

            secretaryResponse.message ||

            "업무 처리가 완료되었습니다.",

            "",

            contentResultText,

          ]
            .filter(
              (
                line
              ) =>

                line !==
                  undefined &&

                line !==
                  null

            )
            .join("\n"),

      });


      /**
       * 최종 화면 메시지
       */
      if (
        finalResult.status ===
        "검수대기"
      ) {

        setLastMessage(

          `${taskId} 제작 완료 · 대표 검수를 기다리고 있습니다.`

        );

      } else if (
        finalResult.status ===
        "완료"
      ) {

        setLastMessage(

          `${taskId} 처리 완료 · ${finalResult.targetCenter} 업무가 완료되었습니다.`

        );

      } else {

        setLastMessage(

          `${taskId} 접수 완료 · ${finalResult.targetCenter}로 전달되었습니다.`

        );

      }


      return true;


    } catch (error) {

      console.error(

        "AI SECRETARY 작업지시서 등록 실패:",

        error

      );


      setLastMessage(

        error instanceof Error

          ? `접수 실패 · ${error.message}`

          : "작업지시서 등록 중 오류가 발생했습니다."

      );


      return false;


    } finally {

      setIsSubmitting(
        false
      );

    }

  }


  /**
   * 진행중 작업 수
   */
  const activeCount =
    workOrders.filter(
      (
        workOrder
      ) =>

        [

          "접수",

          "분류완료",

          "전달완료",

          "분석",

          "진행중",

        ].includes(
          workOrder.status
        )

    ).length;


  /**
   * 검수대기 작업 수
   */
  const reviewCount =
    workOrders.filter(
      (
        workOrder
      ) =>

        workOrder.status ===
        "검수대기"

    ).length;


  /**
   * 완료 작업 수
   */
  const completedCount =
    workOrders.filter(
      (
        workOrder
      ) =>

        workOrder.status ===
        "완료"

    ).length;


  return (

    <div
      className="panel-section operations-panel"
    >


      <div
        className="panel-header-block"
      >

        <span
          className="panel-kicker"
        >
          OPERATIONS
        </span>


        <h2>
          작업관리
        </h2>


        <p>

          대표가 작업지시서를 등록하고 AI 업무 흐름을
          관리하는 HQ 작업실입니다.

        </p>

      </div>


      <div
        className="operations-summary"
      >

        <InfoWidget
          label="전체 작업"
          value={`${workOrders.length}건`}
        />


        <StatusWidget
          label="진행중"
          value={`${activeCount}건`}
          type="yellow"
        />


        <InfoWidget
          label="검수대기"
          value={`${reviewCount}건`}
        />


        <InfoWidget
          label="완료"
          value={`${completedCount}건`}
        />

      </div>


      {lastMessage && (

        <div
          className={
            `operations-result-message ${
              isSubmitting
                ? "is-loading"
                : ""
            }`
          }
        >

          {lastMessage}

        </div>

      )}


      <div
        className="operations-main"
      >

        <div
          className="operations-left"
        >

          <TodayWorkBoard
            workOrders={
              workOrders
            }
          />


          <WorkOrderList
            workOrders={
              workOrders
            }
          />

        </div>


        <div
          className="operations-right"
        >

          <WorkOrderInput
            onSubmit={
              handleAddWorkOrder
            }
            isSubmitting={
              isSubmitting
            }
          />

        </div>

      </div>


      <WorkFlowSteps />


    </div>

  );

}


export default OperationsPanel;