import React from 'react';

export default function VoucherCard({
  code,
  startDate,
  endDate,
  minimumSpend,
}) {
  return (
    <div className="voucher">
      <div className="voucher-body bg-orange-gradient">
        <div className="voucher-text">
          <h5 className="text-white mb-0 font-weight-bold text-2xl m-0">
            SUMMER IS COMING
          </h5>
          <p className="text-white mb-0" style={{ lineHeight: 1 }}>
            <strong style={{ fontSize: '1.25rem' }}>{code}</strong>
            <br />
            Voucher
          </p>
        </div>
        <div className="voucher-overlay d-none">
          <button className="btn btn-primary btn-sm">View Details</button>
        </div>
        <div className="voucher-border-left" />
        <div className="voucher-border-right" />
      </div>
      <div className="voucher-footer">
        <div className="voucher-details">
          <div className="details-icon">
            {/*?xml version="1.0" encoding="utf-8"?*/}
            {/* Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
            <svg
              version="1.1"
              id="time_icon"
              width={24}
              height={24}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 24 24"
              style={{ enableBackground: 'new 0 0 24 24' }}
              xmlSpace="preserve">
              <g>
                <path fill="none" d="M0,0h24v24H0V0z" />
                <path
                  fill="#ffefed"
                  d="M12,2.5c-5.2,0-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5"
                />
                <path
                  fill="#ff4933"
                  d="M12,2c5.5,0,10,4.5,10,10s-4.5,10-10,10S2,17.5,2,12S6.5,2,12,2z M12,3.5c-4.7,0-8.5,3.8-8.5,8.5 s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S16.7,3.5,12,3.5z"
                />
                <path
                  fill="#ff4933"
                  d="M12.7,5.5c0-0.4-0.3-0.8-0.7-0.8s-0.7,0.3-0.7,0.8v7.2c0,0.4,0.3,0.8,0.7,0.8h5.8c0.4,0,0.7-0.3,0.7-0.8 s-0.3-0.8-0.7-0.8h-5.1V5.5z"
                />
              </g>
            </svg>
          </div>
          <div className="details-text">
            <div className="text-title">Valid till</div>
            <div className="text-description text-primary">{endDate}</div>
          </div>
        </div>
        <div className="voucher-details">
          <div className="details-icon">
            {/*- https://www.flaticon.com/free-icon/ringgit_1829674 -*/}
            {/*?xml version="1.0" encoding="utf-8"?*/}
            {/* Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  */}
            <svg
              version="1.1"
              id="ringgit_icon"
              width={28}
              height={28}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 24 24"
              style={{ enableBackground: 'new 0 0 24 24' }}
              xmlSpace="preserve">
              <path
                fill="#ffefed"
                d="M19.7,5.3H4.2c-1.3,0-2.3,1-2.3,2.3v8.8c0,1.3,1,2.3,2.3,2.3h15.5c1.3,0,2.3-1,2.3-2.3V7.6 C22,6.3,21,5.3,19.7,5.3z"
              />
              <path
                fill="#ff4933"
                d="M11.1,14.9c-0.1,0-0.3,0-0.4-0.1L9,13.5v0.8c0,0.3-0.3,0.6-0.6,0.6c-0.3,0-0.6-0.3-0.6-0.6v-2.1c0,0,0,0,0,0 V9.7c0-0.3,0.3-0.6,0.6-0.6h1.3c1,0,1.9,0.8,1.9,1.9c0,0.9-0.6,1.6-1.4,1.8l1.3,1c0.3,0.2,0.3,0.6,0.1,0.9 C11.5,14.9,11.3,14.9,11.1,14.9z M9,11.6h0.6c0.3,0,0.6-0.3,0.6-0.6s-0.3-0.6-0.6-0.6H9V11.6z"
              />
              <path
                fill="#ff4933"
                d="M15.5,14.9c-0.3,0-0.6-0.3-0.6-0.6v-1.9l-0.1,0.1c-0.2,0.4-0.9,0.4-1.1,0l-0.1-0.1v1.9c0,0.3-0.3,0.6-0.6,0.6 c-0.3,0-0.6-0.3-0.6-0.6V9.7c0-0.3,0.2-0.5,0.5-0.6c0.3-0.1,0.6,0.1,0.7,0.3l0.7,1.4l0.7-1.4c0.1-0.3,0.4-0.4,0.7-0.3 c0.3,0.1,0.5,0.3,0.5,0.6v4.6C16.1,14.7,15.8,14.9,15.5,14.9z"
              />
              <path
                fill="#ff4933"
                d="M19.7,18.7H4.2c-1.3,0-2.3-1-2.3-2.3V7.6c0-1.3,1-2.3,2.3-2.3h15.5c1.3,0,2.3,1,2.3,2.3v8.8 C22,17.7,21,18.7,19.7,18.7z M4.2,6.6c-0.6,0-1,0.5-1,1v8.8c0,0.6,0.5,1,1,1h15.5c0.6,0,1-0.5,1-1V7.6c0-0.6-0.5-1-1-1H4.2z"
              />
              <path
                fill="#ff4933"
                d="M7.1,9.1H5c-0.3,0-0.6-0.3-0.6-0.6c0-0.3,0.3-0.6,0.6-0.6h2.1c0.3,0,0.6,0.3,0.6,0.6C7.7,8.8,7.5,9.1,7.1,9.1z"
              />
              <path
                fill="#ff4933"
                d="M18.9,16.2h-2.1c-0.3,0-0.6-0.3-0.6-0.6c0-0.3,0.3-0.6,0.6-0.6h2.1c0.3,0,0.6,0.3,0.6,0.6 C19.5,15.9,19.2,16.2,18.9,16.2z"
              />
            </svg>
          </div>
          <div className="details-text">
            <div className="text-title" style={{ width: 90 }}>
              Minimum spend
            </div>
            <div className="text-description text-primary">{minimumSpend}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
