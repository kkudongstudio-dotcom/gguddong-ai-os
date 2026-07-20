import { useState } from "react";

const serviceLinks = [
  {
    id: "homepage",
    label: "홈페이지",
    description: "GGUDDONG.STUDIO",
    url: "https://gguddong.studio",
    status: "ONLINE",
  },
  {
    id: "lotto-workshop",
    label: "로또분석공방",
    description: "LOTTO WORKSHOP",
    url: "https://ai-lottogongbang.kr",
    status: "ONLINE",
  },
  {
    id: "naver-blog",
    label: "네이버 블로그",
    description: "공식 운영 블로그",
    url: "https://blog.naver.com/gorby_kr",
    status: "ONLINE",
  },
  {
    id: "tistory",
    label: "티스토리",
    description: "콘텐츠 아카이브",
    url: "https://mynote01675.tistory.com/",
    status: "ONLINE",
  },
];

function RightSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleOpenService(service) {
    if (!service.url) {
      return;
    }

    window.open(
      service.url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <aside
      className={`right-sidebar ${
        isCollapsed ? "collapsed" : ""
      }`}
    >
      <div className="right-sidebar-header">
        {!isCollapsed && (
          <div>
            <span>QUICK ACCESS</span>
            <strong>운영 서비스</strong>
          </div>
        )}

        <button
          type="button"
          className="right-sidebar-toggle"
          onClick={() =>
            setIsCollapsed((currentState) => !currentState)
          }
          aria-label={
            isCollapsed
              ? "운영 서비스 사이드바 펼치기"
              : "운영 서비스 사이드바 접기"
          }
          title={
            isCollapsed
              ? "운영 서비스 펼치기"
              : "운영 서비스 접기"
          }
        >
          {isCollapsed ? "‹" : "›"}
        </button>
      </div>

      <div className="right-sidebar-list">
        {serviceLinks.map((service) => {
          const isAvailable = Boolean(service.url);

          return (
            <button
              key={service.id}
              type="button"
              className={`right-service-item ${
                !isAvailable ? "disabled" : ""
              }`}
              onClick={() => handleOpenService(service)}
              disabled={!isAvailable}
              title={
                isCollapsed
                  ? service.label
                  : !isAvailable
                    ? `${service.label} 주소 준비 중`
                    : `${service.label} 열기`
              }
            >
              <span className="right-service-icon">
                {service.label.slice(0, 1)}
              </span>

              {!isCollapsed && (
                <>
                  <span className="right-service-text">
                    <strong>{service.label}</strong>
                    <small>{service.description}</small>
                  </span>

                  <span
                    className={`right-service-status ${
                      service.status === "ONLINE"
                        ? "online"
                        : "ready"
                    }`}
                  >
                    {service.status}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {!isCollapsed && (
        <div className="right-sidebar-footer">
          <span>EXTERNAL SERVICES</span>
          <strong>새 탭으로 열기</strong>
        </div>
      )}
    </aside>
  );
}

export default RightSidebar;