(function () {
  // Tránh chèn trùng lặp nếu script chạy lại
  if (document.getElementById("fb-tools-toolbar")) return;

  function createToolbar() {
    const toolbar = document.createElement("div");
    toolbar.id = "fb-tools-toolbar";

    toolbar.innerHTML = `
      <button class="fb-tool-btn btn-blue" id="btn-thanh-toan">
        <span>&lt;/&gt;</span> Thanh Toán Tích Xanh
      </button>
      <button class="fb-tool-btn btn-yellow" id="btn-up-tuan">
        <span>📋</span> Up 2-4 tuần
      </button>
      <button class="fb-tool-btn btn-green" id="btn-bat-bm">
        <span>📊</span> Bật BM ẩn
      </button>
      <button class="fb-tool-btn btn-purple" id="btn-kick-bm">
        <span>🎛️</span> Kick BM & thêm thẻ
      </button>
      <button class="fb-tool-btn btn-red" id="btn-xoa-verify">
        <span>❌</span> Xoá Verify
      </button>
      <button class="fb-tool-close" id="btn-close-toolbar" title="Đóng">✕</button>
    `;

    document.body.appendChild(toolbar);

    // Gán sự kiện click cho các nút
    document.getElementById("btn-thanh-toan").addEventListener("click", () => {
      alert("Đã kích hoạt: Thanh Toán Tích Xanh");
      // Thêm logic xử lý DOM hoặc gọi API Facebook tại đây
    });

    document.getElementById("btn-up-tuan").addEventListener("click", () => {
      alert("Đã kích hoạt: Up 2-4 tuần");
    });

    document.getElementById("btn-bat-bm").addEventListener("click", () => {
      alert("Đã kích hoạt: Bật BM ẩn");
    });

    document
      .getElementById("btn-kick-bm")
      .addEventListener("click", async () => {
        try {
          // 1. Lấy thông tin UID và BM_ID
          let uid =
            (typeof require === "function" &&
              require("CurrentUserInitialData")?.USER_ID) ||
            document.cookie.match(/c_user=([0-9]+)/)?.[1];
          let bmMatch = document.location.href.match(/business_id=([0-9]+)/);
          let bm_id = bmMatch ? bmMatch[1] : null;
          if (!uid || !bm_id) {
            throw new Error("Không thể lấy UID hoặc Business ID.");
          }
          let match =
            document.cookie.match(/m_ts=[^;]+/) ||
            document.body.innerHTML.match(
              /["']DTSGInitialData["'],\s*\[\s*\],\s*\{\s*["']token["']:\s*["']([^"']+)["']/,
            );
          let fb_dtsg = match[1];
          let flowsessionid =
            "upl_wizard_1781257777936_df0ad3cb-e13b-4e45-8f01-a3acaf57f06a";
          let sessionid =
            "upl_1781257777936_c6891ec9-2f9e-430e-81fc-2854980e6df8";

          let headers = {
            accept: "*/*",
            "accept-language":
              "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            origin: "https://business.facebook.com",
            pragma: "no-cache",
            priority: "u=1, i",
            referer:
              "https://business.facebook.com/latest/settings/mv4b?business_id=" +
              bm_id,
            "sec-ch-prefers-color-scheme": "light",
            "sec-ch-ua":
              '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
            "sec-ch-ua-full-version-list":
              '"Not:A-Brand";v="99.0.0.0", "Google Chrome";v="145.0.7632.45", "Chromium";v="145.0.7632.45"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": '""',
            "sec-ch-ua-platform": '"Windows"',
            "sec-ch-ua-platform-version": '"10.0.0"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "x-bh-flowsessionid": flowsessionid,
            "x-fb-upl-sessionid": sessionid,
            "x-fb-friendly-name": "useMV4BCheckShouldShowLWSV2ExpMutation",
            "x-fb-lsd": "MFwnop4xIgKkYPgCQPZVSt",
          };
          // 3. Thực hiện Request
          let response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=27458&_triggerFlowletID=27455",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "3o",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "useMV4BCheckShouldShowLWSV2ExpMutation",
                variables: JSON.stringify({
                  input: {
                    actor_id: uid,
                    client_mutation_id: "4",
                    business_id: bm_id,
                    surface: "deka_landing_screen",
                  },
                }),
                server_timestamps: "true",
                doc_id: "24545255228433128",
              }),
            },
          );
          await response.json();

          headers = {
            accept: "*/*",
            "accept-language":
              "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            origin: "https://business.facebook.com",
            pragma: "no-cache",
            priority: "u=1, i",
            referer:
              "https://business.facebook.com/latest/settings/mv4b?business_id=" +
              bm_id,
            "sec-ch-prefers-color-scheme": "light",
            "sec-ch-ua":
              '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
            "sec-ch-ua-full-version-list":
              '"Not:A-Brand";v="99.0.0.0", "Google Chrome";v="145.0.7632.45", "Chromium";v="145.0.7632.45"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": '""',
            "sec-ch-ua-platform": '"Windows"',
            "sec-ch-ua-platform-version": '"10.0.0"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "x-bh-flowsessionid": flowsessionid, //them code cũ
            "x-fb-upl-sessionid": sessionid, //them code cũ
            //"x-asbd-id": "359341",
            "x-fb-friendly-name": "useMV4BCreateEmptyBizApplicationMutation",
            "x-fb-lsd": "MFwnop4xIgKkYPgCQPZVSt",
          };
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=29281&_triggerFlowletID=29277",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "3y",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "useMV4BCreateEmptyBizApplicationMutation",
                variables:
                  '{"input":{"actor_id":"' +
                  uid +
                  '","client_mutation_id":"5","business_id":"' +
                  bm_id +
                  '","surface":"onboarding_tier_selection_screen"}}',
                server_timestamps: "true",
                doc_id: "24255418677397713",
              }),
            },
          );
          let result = await response.json();
          console.log(result);

          headers = {
            accept: "*/*",
            "accept-language":
              "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            origin: "https://business.facebook.com",
            pragma: "no-cache",
            priority: "u=1, i",
            referer:
              "https://business.facebook.com/latest/settings/mv4b?business_id=" +
              bm_id,
            "sec-ch-prefers-color-scheme": "light",
            "sec-ch-ua":
              '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
            "sec-ch-ua-full-version-list":
              '"Not:A-Brand";v="99.0.0.0", "Google Chrome";v="145.0.7632.45", "Chromium";v="145.0.7632.45"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": '""',
            "sec-ch-ua-platform": '"Windows"',
            "sec-ch-ua-platform-version": '"10.0.0"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "x-bh-flowsessionid": flowsessionid, //them code cũ
            "x-fb-upl-sessionid": sessionid, //them code cũ
            //"x-asbd-id": "359341",
            "x-fb-friendly-name":
              "BusinessCometBizSuiteSettingsMV4BPaymentHooksCreateMV4BAccountMutation",
            "x-fb-lsd": "MFwnop4xIgKkYPgCQPZVSt",
          };
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=29277",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "3z",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "BusinessCometBizSuiteSettingsMV4BPaymentHooksCreateMV4BAccountMutation",
                variables:
                  '{"input":{"client_mutation_id":"6","actor_id":"' +
                  uid +
                  '","business_id":"' +
                  bm_id +
                  '"}}',
                server_timestamps: "true",
                doc_id: "23886793950945151",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] =
            "BusinessCometBizSuiteSettingsMV4BOnboardingViewContainerQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=29346",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "40",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "BusinessCometBizSuiteSettingsMV4BOnboardingViewContainerQuery",
                variables:
                  '{"assetTypes":["WHATSAPP_BUSINESS_ACCOUNT","INSTAGRAM_ACCOUNT_V2","PAGE"],"businessID":"' +
                  bm_id +
                  '","maxNumBizAssetsFetched":30,"selectedTier":null}',
                server_timestamps: "true",
                doc_id: "26475565042128442",
                //27766429982951608
              }),
            },
          );
          result = await response.json();

          paymentAccountID =
            result.data.business.mv4b_billable_account.billing_payment_account
              .payment_legacy_account_id;

          //-------------------them method id-----------------

          headers["x-fb-friendly-name"] =
            "BillingPaymentMethodDisplayUtilsQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=29346",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "42",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "BillingPaymentMethodDisplayUtilsQuery",
                variables: '{"paymentMethodID":""}',
                server_timestamps: "true",
                doc_id: "24502162706140175",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] = "useBillingWizardQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=29346",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "43",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "useBillingWizardQuery",
                variables:
                  '{"paymentAccountID":"' +
                  paymentAccountID +
                  '","gks":[{"name":"BILLING_REACT_XMDS_MIGRATION_TARGETING_GK","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_O1_NONREVENUE_SHIPPING_GK_2026Q1_AD_ACCOUNT_ID","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_NONREV_SHIPPING_GK_2026H1_AD_ACCOUNT_ID_V1","type":"PAYMENT_ACCOUNT_ID"}]}',
                server_timestamps: "true",
                doc_id: "26312750838392490",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] = "BillingContextFactoryQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=31859&_triggerFlowletID=31850",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "4c",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "BillingContextFactoryQuery",
                variables:
                  '{"gks":[{"name":"ADD_FUNDS_NEW_CARD_GLOBAL","type":"PAYMENT_ACCOUNT_ID"},{"name":"ADD_FUNDS_NEW_CARD_INDIA","type":"PAYMENT_ACCOUNT_ID"},{"name":"ALPHANUMERIC_CNPJ_ENABLED","type":"PAYMENT_ACCOUNT_ID"},{"name":"ALR_FP_ON_BILLING_WIZARD_MOBILE","type":"USER_ID"},{"name":"ALR_FP_ON_BILLING_WIZARD_MSITE","type":"USER_ID"},{"name":"AMA_TRUSTED_DEVICE_KEY_REGISTRATION_ENABLED","type":"PAYMENT_ACCOUNT_ID"},{"name":"AUTO_RELOAD_FAILED_DOGFOODING","type":"PAYMENT_ACCOUNT_ID"},{"name":"AUTO_RELOAD_FAILED_V2_TARGETING","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_ACTIVATE_BM_CC_OMNIPE_GLOBAL","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_AD_ACCOUNT_IN_INDIA","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_AD_ACCOUNT_IN_US","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_ADD_CC_FORM_FRONTIER_PATTERN_INTERNAL_TEST","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_ASL_DEFAULTING_TEST_CONTROL","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_AWARE_ONBOARDING_OPTION_1_TESTERS","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_AWARE_ONBOARDING_OPTION_2_TESTERS","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_BM_CC_OMNIPE_GLOBAL","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_BV_CORE_ADS_EXPERIMENT_MOBILE_GK","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_CHARGE_BREAKDOWN_DEV","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_CHINESE_RESELLERS","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_CLIENT_RESULT_MIGRATION","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_COUNTRY_SPOOFING_PHONE_NUMBER_VERIFICATION","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_E2EE_MIGRATION_ANDROID","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_E2EE_MIGRATION_IOS","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_ECP_TYPEAHEAD_INTERNAL_TESTING","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_HELP_CENTER","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_IAP_BR_CONFIG_ENABLED","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_IAP_CAN_UPDATE_COUNTRY_EXCLUDE_PREPAY_USER","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_INCREASE_PREPAY_STORED_BALANCE_LIMIT","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_INTERFACES_DEFCON_1","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_INTERFACES_DEFCON_2","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_INTERFACES_DEFCON_3","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_MODULAR_PTT_API_MIGRATION","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_MODULAR_PTT_ON_FOA_ENABLED","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_MODULAR_PTT_ON_MBS_ENABLED","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_MODULAR_PTT_SMBA_REACT_NATIVE_ENABLED","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_MV4B_LWS_EXPERIENCE","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_NEXT_AVAILABLE_ACTIONS_MOBILE_BV_GK","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_NEXT_AVAILABLE_ACTIONS_MOBILE_GK","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_PTT_MIGRATION_PREPAY_REFUND","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_PTT_MIGRATION_SECURE_BUSINESS_REFUND","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_REACT_NATIVE_XMDS_REMAINING_FLOWS","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_REACT_XMDS_MIGRATION_INTERNAL","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_REACT_XMDS_MIGRATION_TARGETING_GK","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_SAVE_MOMO_SHIPPING_TARGETING_GK","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_SCHEDULE_PAYMENT_DOGFOODING","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_SPEND_MORE_ELIGIBILITY_ENTRYPOINTS","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_TEST_UNIONPAY_LUHN_BYPASS","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_TRANSLATION_IMPR_LATAM_PHASE_2_TARGETING","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_TRANSLATION_IMPR_LATAM_Q3_25_TARGETTING","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_USE_BELIEVE_SET_COUNTRY_CURRENCY_MUTATION","type":"PAYMENT_ACCOUNT_ID"},{"name":"BILLING_WIZARD_ENABLE_ALR_FP_SUPPORT","type":"USER_ID"},{"name":"BILLING_WIZARD_EXTERNAL_SITE_S612295_FIX_GK","type":"PAYMENT_ACCOUNT_ID"},{"name":"BRAZIL_MV4B_LOCALIZED","type":"PAYMENT_ACCOUNT_ID"},{"name":"BRAZIL_VAT_REFORM_CPF_ADDRESS_VALIDATION","type":"PAYMENT_ACCOUNT_ID"},{"name":"CVCO_SDC_USE_SERVER_AUTH_STATUS","type":"PAYMENT_ACCOUNT_ID"},{"name":"DEBUG_LOGGING_REFACTORED_WIZARD_PRELOADER","type":"PAYMENT_ACCOUNT_ID"},{"name":"DIRECT_DEBIT_REVERIFICATION_ENABLED","type":"PAYMENT_ACCOUNT_ID"},{"name":"DST_CONTENT_UPDATE","type":"PAYMENT_ACCOUNT_ID"},{"name":"IG_BILLING_HUB_MOBILE_ALR_EXPANSION_GK","type":"PAYMENT_ACCOUNT_ID"},{"name":"L5_CREDENTIAL_SHARING_CAS_BACKTEST_TARGETING","type":"PAYMENT_ACCOUNT_ID"},{"name":"L5_CREDENTIAL_SHARING_GK","type":"PAYMENT_ACCOUNT_ID"},{"name":"LLMDC_BILLING_GLOBAL_EXPANSION","type":"PAYMENT_ACCOUNT_ID"},{"name":"LOG_REFACTORED_PRELOADING_QUERY_ERRORS","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_IREV_SHIPPING_GK_2026H1_AD_ACCOUNT_ID_V1","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_NONREV_SHIPPING_GK_2026H1_AD_ACCOUNT_ID_V1","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_O1_IREV_SHIPPING_GK_2026Q1_AD_ACCOUNT_ID","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_O1_NONREVENUE_SHIPPING_GK_2025H1_AD_ACCOUNT_ID","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_O1_NONREVENUE_SHIPPING_GK_2025Q3_AD_ACCOUNT_ID","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_O1_NONREVENUE_SHIPPING_GK_2025Q4_AD_ACCOUNT_ID","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_O1_NONREVENUE_SHIPPING_GK_2026Q1_AD_ACCOUNT_ID","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_O1_PREV_SHIPPING_GK_2026Q1_AD_ACCOUNT_ID","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_O1_SHIPPING_GK_2025Q4_PBAR_AD_ACCOUNT_ID","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_O1_SHIPPING_GK_2025Q4_PERO_AD_ACCOUNT_ID","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_USABILITY_FIXATHON_FLOW_10_1_HOLD_OUT","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_USABILITY_FIXATHON_FLOW_10_2_HOLD_OUT","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_USABILITY_FIXATHON_FLOW_9_1_HOLD_OUT","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_USABILITY_FIXATHON_FLOW_9_2_HOLD_OUT","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_USABILITY_FIXATHON_FLOW_9_3_HOLD_OUT","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_USABILITY_FLOW_10_1_AUTO_RELOAD_V3","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_USABILITY_FLOW_10_1_AUTO_RELOAD_V3_HOLD_OUT","type":"PAYMENT_ACCOUNT_ID"},{"name":"MFT_USABILITY_FLOW_10_1_HOLD_OUT","type":"PAYMENT_ACCOUNT_ID"},{"name":"MIO_MANDATE_FULL","type":"PAYMENT_ACCOUNT_ID"},{"name":"MIO_ONBOARDING_USE_DOC_AI_CHECK_FLOW","type":"USER_ID"},{"name":"MV4B_FREE_TRIAL_ADD_USER_CONSENT","type":"PAYMENT_ACCOUNT_ID"},{"name":"MV4B_FTC_US_CHECKBOX_REQUIREMENT","type":"PAYMENT_ACCOUNT_ID"},{"name":"NON_ADS_LOCALIZATION_NUX_INDIA_ENABLED","type":"USER_ID"},{"name":"NON_ADS_LOCALIZATION_NUX_SS_BRAZIL_ENABLED","type":"ACCOUNT_ID"},{"name":"NON_ADS_LOCALIZATION_SS_NUX_INDIA_ENABLED","type":"PAYMENT_ACCOUNT_ID"},{"name":"PAY_NOW_GRAPHQL_MUTATION_REFACTOR","type":"PAYMENT_ACCOUNT_ID"},{"name":"PILL_AMOUNT_OPTIMIZATION_DOG_FOODING","type":"PAYMENT_ACCOUNT_ID"},{"name":"PLATFORMIZED_MV4B_PAYU_INDIA_UPI_GK","type":"PAYMENT_ACCOUNT_ID"},{"name":"REAL_TIME_TAX_ID_VALIDATION_EG_MV4B_ROLLOUT","type":"PAYMENT_ACCOUNT_ID"},{"name":"REAL_TIME_TAX_ID_VALIDATION_IN_MV4B_ROLLOUT","type":"PAYMENT_ACCOUNT_ID"},{"name":"TEST_BILLING_GK_EXPOSURE_LOGGING","type":"PAYMENT_ACCOUNT_ID"},{"name":"TURKEY_TAX_OFFICE_COLLECTION","type":"PAYMENT_ACCOUNT_ID"},{"name":"UAA_MFT_2026_LAUNCH","type":"PAYMENT_ACCOUNT_ID"}],"hasPaymentAccount":true,"paymentAccountID":"' +
                  paymentAccountID +
                  '","universes":[{"params":["is_sdc_default"],"universe_name":"ads_agency_verification"},{"params":["enable_prepay_cc"],"universe_name":"ads_br_cc_prepay_targeting_universe"},{"params":["recurring_enabled"],"universe_name":"ads_lpm_ant_alipay_cn"},{"params":["recurring_enabled"],"universe_name":"ads_lpm_ant_alipay_hk"},{"params":["recurring_enabled"],"universe_name":"ads_lpm_ant_dana_id"},{"params":["recurring_enabled"],"universe_name":"ads_lpm_ant_gcash_ph"},{"params":["recurring_enabled"],"universe_name":"ads_lpm_ant_kakaopay_kr"},{"params":["recurring_enabled"],"universe_name":"ads_lpm_ant_maya_ph"},{"params":["recurring_enabled"],"universe_name":"ads_lpm_ant_tng_my"},{"params":["recurring_enabled"],"universe_name":"ads_lpm_ant_toss_kr"},{"params":["recurring_enabled"],"universe_name":"ads_lpm_ant_truemoney_th"},{"params":["recurring_enabled"],"universe_name":"ads_lpm_razorpay_upi"},{"params":["enable_altpay_ml_pills_v3"],"universe_name":"altpay_ml_pill_prediction"},{"params":["enabled"],"universe_name":"ama_user_fq"},{"params":["trusted_device_key_registration_enabled"],"universe_name":"ama4a_trusted_device_key_registration"},{"params":["add_card_trusted_device_signal_enabled"],"universe_name":"ama4a_trusted_device_signal_add_card"},{"params":["logging_param"],"universe_name":"ama4a_trusted_device_signal_add_card_logging"},{"params":["add_card_trusted_device_signal_enabled"],"universe_name":"ama4a_trusted_device_signal_add_fund"},{"params":["pay_now_trusted_device_signal_enabled"],"universe_name":"ama4a_trusted_device_signal_pay_now"},{"params":["trusted_device_key_registration_enabled"],"universe_name":"amaios_trusted_device_key_registration"},{"params":["add_card_trusted_device_signal_enabled"],"universe_name":"amaios_trusted_device_signal_add_card"},{"params":["logging_param"],"universe_name":"amaios_trusted_device_signal_add_card_logging"},{"params":["add_card_trusted_device_signal_enabled"],"universe_name":"amaios_trusted_device_signal_add_fund"},{"params":["pay_now_trusted_device_signal_enabled"],"universe_name":"amaios_trusted_device_signal_pay_now"},{"params":["logging_param"],"universe_name":"amaios_trusted_device_signal_pay_now_logging"},{"params":["enabled"],"universe_name":"attempt_to_fix_stale_wizard_queries_univser"},{"params":["enable_v3"],"type":"PAYMENT_ACCOUNT","universe_name":"auto_reload_v3"},{"params":["show_improvements"],"type":"PAYMENT_ACCOUNT","universe_name":"balance_and_funds_state"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_add_cc_form_frontier_pattern_integrations__logging"},{"params":["enable_fallback"],"universe_name":"billing_add_funds_provider_id_fallback"},{"params":["should_rank","should_rank_all","should_show_badge"],"universe_name":"billing_add_pm_ranking"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_add_pm_ranking__logging"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_auto_reload_failed_v2__logging"},{"params":["enable_v2"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_auto_reload_suggested_amounts"},{"params":["in_option_1","in_option_2"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_aware_onboarding"},{"params":["enabled"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_card_type_not_supported_banner"},{"params":["use_new_redesign"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_country_currency_redesign_h2_2025_v2"},{"params":["show_localized_currency"],"universe_name":"billing_currency_localization"},{"params":["show_correct_amounts"],"universe_name":"billing_iap_default_payment_amount_universe"},{"params":["india_cc_pending_default"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_india_cc_pending_default"},{"params":["use_new_content"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_india_translation_imprv_q2_26"},{"params":["hide_unloadgurad_v1"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_lpm_success_screen"},{"params":["modular_ptt_api_enabled"],"universe_name":"billing_mobile_modular_ptt_api_migration_ama_ios_logging"},{"params":["dummy_param"],"universe_name":"billing_mobile_modular_ptt_api_migration_fb_android__logging"},{"params":["dummy_param"],"universe_name":"billing_mobile_modular_ptt_api_migration_fb_ios__logging"},{"params":["recurring_enabled"],"universe_name":"billing_momo_recurring_2025"},{"params":["enable_input_polish"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_native_otp_input_polish_h126"},{"params":["enabled"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_next_best_actions_latency"},{"params":["should_rank"],"universe_name":"billing_pm_ranking_expansion"},{"params":["xmds_enabled"],"universe_name":"billing_react_native_android_instagram_xmds_migration"},{"params":["xmds_enabled"],"universe_name":"billing_react_native_excluded_country_xmds_migration"},{"params":["xmds_enabled"],"universe_name":"billing_react_native_fb_iap_xmds_migration"},{"params":["xmds_enabled"],"universe_name":"billing_react_native_instagram_xmds_migration"},{"params":["xmds_enabled"],"universe_name":"billing_react_native_xmds_migration"},{"params":["xmds_enabled"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_react_xmds_migration_add_pm_msite"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_react_xmds_migration_add_pm_msite__logging"},{"params":["xmds_enabled"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_react_xmds_migration_add_pm_web"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_react_xmds_migration_add_pm_web__logging"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_save_momo_universe_logging"},{"params":["use_automatic_payments"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_terms_automatic_payments"},{"params":["use_outstanding_balance"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_terms_outstanding_balance"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_terms_outstanding_balance__logging"},{"params":["use_new_translation_phase_2"],"universe_name":"billing_translation_improvements_latam"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_translation_improvements_latam__logging"},{"params":["dummy_param"],"universe_name":"billing_translation_improvements_q3_2025_logging"},{"params":["app_select_with_elevated_qr","app_select_with_qr","direct_upi_b3p","is_checkbox_nested","is_checkbox_new_row","recurring_enabled"],"universe_name":"billing_upi_2025"},{"params":["show_pending_payment"],"universe_name":"billing_upi_pending_payment_h225"},{"params":["recurring_enabled"],"universe_name":"billing_upi_recurring_2025"},{"params":["hide_title"],"type":"PAYMENT_ACCOUNT","universe_name":"billing_usability_fixes_h12025"},{"params":["enabled"],"type":"USER_ACCOUNT","universe_name":"billing_wizard_alr_for_failed_payment"},{"params":["allow_sharing_cards"],"type":"PAYMENT_ACCOUNT","universe_name":"bns_copy_sibling_card_ad"},{"params":["share_credential"],"type":"BUSINESS_ID","universe_name":"bns_credential_sharing"},{"params":["share_credential"],"type":"PAYMENT_ACCOUNT","universe_name":"bns_credential_sharing_l4"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"ce_ux_account_transitions_logging"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"ce_ux_postpay_upsell_h2_2025_logging"},{"params":["dummy_param"],"universe_name":"charge_user_upon_changing_pfs_shipping"},{"params":["enable"],"type":"PAYMENT_ACCOUNT","universe_name":"content_string_replacement_experiments"},{"params":["enabled"],"universe_name":"credit_card_sharing_metapay_to_ads_billing"},{"params":["hide_cvv_field"],"type":"PAYMENT_ACCOUNT","universe_name":"cvv_less_card_save_eea_h1_26"},{"params":["use_trustly"],"type":"PAYMENT_ACCOUNT","universe_name":"direct_debit_for_high_cas"},{"params":["enabled"],"type":"PAYMENT_ACCOUNT","universe_name":"direct_debit_upsell"},{"params":["block_sdc_step_up_and_frictionless","block_sdc_step_up_only"],"type":"PAYMENT_ACCOUNT","universe_name":"fi_risk_prevent_sdc_fallback"},{"params":["enable_exit_overlay","enable_exit_overlay_prepay"],"universe_name":"guided_experience_exit_overlay"},{"params":["enable_exit_overlay","enable_notify_admin"],"universe_name":"guided_experience_exit_overlay_lpm"},{"params":["enable_error_recovery"],"universe_name":"guidedexperience"},{"params":["enable_error_recovery"],"universe_name":"guidedexperience_error_optimization_catch_all"},{"params":["on_iap_location_info_optimization_fb"],"universe_name":"iap_location_info_optimization_fb"},{"params":["on_iap_location_info_optimization_ig"],"universe_name":"iap_location_info_optimization_ig"},{"params":["is_steering_enabled_with_friction"],"universe_name":"ig_fb_shared_iap_us_steering_rollout"},{"params":["enabled"],"universe_name":"increase_min_account_spending_limit"},{"params":["enabled"],"type":"PAYMENT_ACCOUNT","universe_name":"india_billing_pmt_unknown_card_type_allow"},{"params":["enable_l5_cc_as_backup_ui_improvement"],"type":"PAYMENT_ACCOUNT","universe_name":"l5_credential_sharing"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"l5_credential_sharing__logging"},{"params":["subscription_enable"],"type":"PAYMENT_ACCOUNT","universe_name":"lwi_subscription_universe"},{"params":["enabled"],"type":"PAYMENT_ACCOUNT","universe_name":"maiba_dora_notifications"},{"params":["show_confirmation"],"type":"PAYMENT_ACCOUNT","universe_name":"mft_usability_t214327445_confirmation"},{"params":["allow_copy_card"],"type":"USER_ACCOUNT","universe_name":"mv4b_copy_card"},{"params":["enable_notify_admin"],"universe_name":"notify_admin"},{"params":["dummy_param"],"universe_name":"one_click_auto_reload_in_add_funds_shipping"},{"params":["dummy_param_v2"],"universe_name":"pill_amount_selection_v1_logging"},{"params":["enable_ml_results_v6"],"universe_name":"pill_ml_prediction"},{"params":["enable_pills_v3"],"type":"PAYMENT_ACCOUNT","universe_name":"rn_payment_settings_enable_pills"},{"params":["dummy_param"],"universe_name":"save_add_funds_combined_india__logging"},{"params":["enable"],"universe_name":"save_and_add_funds_combined_global"},{"params":["one_time_schedule_enabled"],"type":"PAYMENT_ACCOUNT","universe_name":"scheduled_payments_universe"},{"params":["enable_alr_integration","enable_ux_improvements"],"type":"PAYMENT_ACCOUNT","universe_name":"seb_ux_updates_h1_26"},{"params":["enable_nux_support"],"type":"PAYMENT_ACCOUNT","universe_name":"secure_billing_nux_support_h1_2026"},{"params":["is_enabled"],"universe_name":"suggest_alternate_amt"},{"params":["dummy_param"],"universe_name":"suggest_alternate_amt_logging"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"sync_cvco_stepup__logging"},{"params":["use_cvco_inflow_stepup"],"type":"PAYMENT_ACCOUNT","universe_name":"sync_cvco_stepup_add_funds"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"test_billing_gk_exposure_logging_dummy_qe"},{"params":["use_trustly"],"universe_name":"trustly_sepa_bacs"},{"params":["enabled"],"universe_name":"unblock_low_future_spend_advertiser_preauth"},{"params":["is_enabled"],"universe_name":"unblock_low_future_spend_advertiser_preauth_global"},{"params":["update_default"],"type":"PAYMENT_ACCOUNT","universe_name":"usability_flow107_t213933791"},{"params":["use_trustly"],"universe_name":"use_trustly_without_balance_check_eu"},{"params":["inline"],"type":"BUSINESS_ID","universe_name":"wa_paidm_credential_sharing"},{"params":["add_funds_manual"],"type":"PAYMENT_ACCOUNT","universe_name":"wizard_preloading_refactor"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"wizard_preloading_refactor__logging"},{"params":["dummy_param"],"type":"PAYMENT_ACCOUNT","universe_name":"wizard_preloading_refactor_add_pm__logging"}]}',
                server_timestamps: "true",
                doc_id: "27165776749691107",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] =
            "BillingAddPaymentMethodInitStateStateQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=31923",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "4i",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "BillingAddPaymentMethodInitStateStateQuery",
                variables: '{"paymentAccountID":"' + paymentAccountID + '"}',
                server_timestamps: "true",
                doc_id: "8836386303151643",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] =
            "BillingCheckCreateNewFromOldStateQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=31923",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "4l",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "BillingCheckCreateNewFromOldStateQuery",
                variables: '{"paymentAccountID":"' + paymentAccountID + '"}',
                server_timestamps: "true",
                doc_id: "24476705928644993",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] = "BillingQELogExposureMutation";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=31923",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "4m",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "BillingQELogExposureMutation",
                variables:
                  '{"input":{"param":"enabled","payment_legacy_account_id":"' +
                  paymentAccountID +
                  '","universe_name":"attempt_to_fix_stale_wizard_queries_univser","actor_id":"' +
                  uid +
                  '","client_mutation_id":"1"}}',
                server_timestamps: "true",
                doc_id: "24755584620725827",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] =
            "BillingAccountInformationUtilsUpdateAccountMutation";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=31923",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "4n",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "BillingAccountInformationUtilsUpdateAccountMutation",
                variables:
                  '{"input":{"billable_account_payment_legacy_account_id":"' +
                  paymentAccountID +
                  '","currency":"' +
                  currency +
                  '","device_country":null,"tax":{"business_address":{"country_code":"' +
                  selected_country +
                  '"}},"timezone":null,"upl_logging_data":{"context":"billingaccountinfo","entry_point":"mbs_mv4b_lws_onboarding","external_flow_id":"' +
                  external_flow_id +
                  '","target_name":"BillingAccountInformationUtilsUpdateAccountMutation","user_session_id":"' +
                  sessionid +
                  '","wizard_config_name":"BUSINESS_INFO_SUB","wizard_name":"ADD_PM","wizard_session_id":"' +
                  flowsessionid +
                  '"},"actor_id":"' +
                  uid +
                  '","client_mutation_id":"2"},"includeCreateNewFromOldFragment":false}',
                server_timestamps: "true",
                doc_id: "33020210320959428",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] =
            "BillingAccountInformationScreenQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=31923",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "4q",
                __hs: "20617.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041410692",
                __s: "5psvuv:5kfnrd:y7r5f3",
                __hsi: "7650720339752440893",
                __dyn:
                  "7xeUmxa2C6oCdwkECbwyyVp4Ub9o9E6u5aCG6UmCyE5W4UKewSAxam4Eco5S4Eaobo-dy8jwl8gwqoqxSdz8hw9-3a36HwQg9omwoU9FE4WqbwLghwLyaxBa2du3KbK3S0BoqgOUa8lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULxm3ydDxG1bwMzUkGvK68lwKG13y86qbxa4oO9wECyKbwzweau0Jo6-3u36i2G2B0wzFHwCxu6o9U4S7E6B0gEjADwOwuE6q7E5y2-1mwxwkU8888twZw-wRwQwhopoiwDwRw963i4oowlqwTwYx6mXDzoFo",
                __csr:
                  "g794Yl0Gh5jhI889OdjPh4hdsQDsAD5OEIlN34n9Ojhq5ih7iKGiqRbN5qkAJvFRbtMFRfilsJkQhWIDkHvRd-ZAbtZEHil4GBXW-WDamOpbAmAZAPXQyaF7uGhbq-HgVbRmCALRLWF6iAD_At6inmJnl999kGjt2aQP8CXgzCqOb_AACmrFR9OkjrlAKBrBKpyF4HQFBnhlCKjUOiaiQGA8GKm8XiUxGHJWhfyZRn-8W-ThrvxlGby4qiijWGFqBVe-Hy8CGhlmmZbiBnP2WAGpaHuCry9pExXgghoWnBzQiy58FGiZ4TVoG9Zebp4FJ2pAexaFARDiUizECbGmnDK4rzGBUPzQmECqueG5UN7DWxbxa4pF8yq48kqhrx2q2aaG2Ly49GuFUOGzEqjz898Oh0wxqm2vK_UJVojQi22UnhEyexa8xHUCmfm78lxCE8qGqcBzWK9DCy9E8GwhEmKfhEaV-2mi1igKq4FUgxaVUSum2-8wpo9UiyE9A2O19wCxe58ymEmxq3eUK1Nzo4O7bDmtcwcAu598GGbujhku4ozXqy9p6Gv8uKi58Wq2aU8FU8EyeF8yTJq-VuuUTum6UvDy4uQF9qBHUmKZfnS_rmVHWbFEGXF3AGFbAW81owio7y0So0zS27K8xsz9yX-7k7oi62cC3F0Pc8wn4-F8CcByBKh1q3gayxomkYwlxK14wKwU5mm0S8kxkk0sFw_w5hw997hFUx0gEeUdUep6e2w5C3e08sg0k9wrUqw2eUpwb_isgAvDglP0h892Dwo43Df9qyVY52wkR1m9y0x1Dzsbx28xa7VSCm8gKmcwaipm5o2P1nx3qaGAhEW54cqEnx2i099w1fazOK0jK0ybCrc260BE3TwcC0ahCwdG4VAbwai0bmw1Y-0a1wdG0yA0OS0JAu8g9ovwvWDwDwM-Eb9Q3K0Y8y1Tz40ru0wogg17UV1u05pU1vE4e0v6gK0yU2GxGt04hAba0XaU0h6c02nd3F-6dzErJxybGq1rwzwdK1o22gyForIS1WLo1Q8foy07ue4E6Qw0tZX-8mrtU0S60Fosw2QU3iWmmczo1lU5C0ke0kF1Wq04Ak061o2Gw2qoeoh4oxyGebUC8OzF2G4Q5ywkxkNAq8gKp07CGbw5Vo1Ro112rLx-68S28-FEC8wei0uC3K36i8w8y02u50Vg5KFA1wiAw",
                __hsdp:
                  "g2dJglIr3AIdgH2hc8gjMhORIRNCA8Se89GPb9ctFD9gxaJ96gZ1Ob6GijCzWu4MHVrkgj316qv3R-cQmGQmCD49RRtgz7OglRFHhHJbo84EW6U45fz4uf8ccq5oR7GaBJwxJdaq16xenF5W89B9t0Jx25HoQwkqykbzWK9U93DWCy9ojxul28hFlhu2GKfZySx2gKgx8f8rDz9pm8K48B5wJhh04K2G5kq2mAWwHwQwmUeoaGGWpjhgxbN0Yqeogx1d0wJwmA0W49g1x89oO1Ow7X80Xk09yg0s3w3xaAo2Aw0Ccw19O0eUwDw2ho0oew1oG",
                __hblp:
                  "1m1BxOi2O1bwp61ywNwzw9y48aUO4KEnwLwRDwG84EG0B8C1Lw9O3O9BwrE4S48gKvwOgjDAUcnh-FEym3K5XDwGxjK2uUy3N28hyUW4bx29g84bCBxa1GzFVE4zx63i0wF8-ezE9EizES7E-cKUa98Kp0gk0FE4yaK1Pz8Si2yq1Ojw-wyigG4omxmUqxiK3-4oe8O2q2eU6S15yUbUqz8Cdx26A786Cmq2totCCxCdx10xK2y1hxi5XDwjUaFU2-Cxu3q5EbEgwMgjzo3TwOxe2O1WwgV89VE4-1JwSyk1SyEKu2u18Cy8aE6i1AK6EiwJyU9V86u2a58fU_w8e5osyEy1ZxCdyoaoco5e69Ubu6o6qbAK1-wr8b8focUiwIwgogxC0HVopwNwCwxUc8rx25E-aw4KAwHxzzVoG3q36u1fS0PolDBG0zohwr8eEOHzoS2S4e2e2a4V8kDyEtwPCxi2Nt0Mxe6agmwDwayfwYUy0KQ5o-7UeUhAwLxKuawwG7o-7eagpgydwgQ5UvwiEkzU8oydz8iAyECt0i8KEy4ocoCcwUxe8U8EiAyKbDBzUqyqAK4ox2pXxSeDxmaCwAAU2mU-q1Xxy6U9o590UBDyU6KbyK2h1idAy8oDz8nKawPx116bxu2W2q13z8yQjdLbwJU9V83LyK1Oxidwgk2O786S6k3a5EbE5C3W1MU1gUbUkxCm2m368wGwkWwEy8jx2bwgpUsxnzQ2W2B7xe3a1liyo5e58SE423C6Eak8goyWxGnwzx63KbO5CXw",
                __sjsp:
                  "g2dJglIr3AIdgH2hIt2Q8ghORIRNCA8Se89GPb9ctFD9gxaJ96gZ1Ob6GijCzWu4MHVrkgj316qv3R-cQmGQmCD49RRtgz7OglRFHhHJbo84EW6U45fz4uf8ccq5oR7GayU8rjgC1qBWhuy2pingbogxqSd856EB2U-Hyu2gV-FEym2Kl28hFlhu2GKfZySx2gKgx8f8rDz9pm8K48B5wJhh04K2G5kq2mA3a3i1rwpaGWpjhgxbN0Yqeogx1d0wJwmA0W49g1x89oO1Ow7X80Xk09yg",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25331",
                lsd: "1MZj9eDbeloGgQHk3n-vVS",
                __spin_r: "1041410692",
                __spin_b: "trunk",
                __spin_t: "1781322141",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "BillingAccountInformationScreenQuery",
                variables: '{"paymentAccountID":"' + paymentAccountID + '"}',
                server_timestamps: "true",
                doc_id: "26909504292004383",
              }),
            },
          );
          await response.json();
          console.log(response);

          headers["x-fb-friendly-name"] =
            "useBillingAcknowledgeSoftTaxInfoMutation";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=32286",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "4s",
                __hs: "20617.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041410692",
                __s: "5psvuv:5kfnrd:y7r5f3",
                __hsi: "7650720339752440893",
                __dyn:
                  "7xeUmxa2C6oCdwkECbwyyVp4Ub9o9E6u5aCG6UmCyE5W4UKewSAxam4Eco5S4Eaobo-dy8jwl8gwqoqxSdz8hw9-3a36HwQg9omwoU9FE4WqbwLghwLyaxBa2du3KbK3S0BoqgOUa8lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULxm3ydDxG1bwMzUkGvK68lwKG13y86qbxa4oO9wECyKbwzweau0Jo6-3u36i2G2B0wzFHwCxu6o9U4S7E6B0gEjADwOwuE6q7E5y2-1mwxwkU8888twZw-wRwQwhopoiwDwRw963i4oowlqwTwYx6mXDzoFo",
                __csr:
                  "g794Yl0Gh5jhI889OdjPh4hdsQDsAD5OEIlN34n9Ojhq5ih7iKGiqRbN5qkAJvFRbtMFRfilsJkQhWIDkHvRd-ZAbtZEHil4GBXW-WDamOpbAmAZAPXQyaF7uGhbq-HgVbRmCALRLWF6iAD_At6inmJnl999kGjt2aQP8CXgzCqOb_AACmrFR9OkjrlAKBrBKpyF4HQFBnhlCKjUOiaiQGA8GKm8XiUxGHJWhfyZRn-8W-ThrvxlGby4qiijWGFqBVe-Hy8CGhlmmZbiBnP2WAGpaHuCry9pExXgghoWnBzQiy58FGiZ4TVoG9Zebp4FJ2pAexaFARDiUizECbGmnDK4rzGBUPzQmECqueG5UN7DWxbxa4pF8yq48kqhrx2q2aaG2Ly49GuFUOGzEqjz898Oh0wxqm2vK_UJVojQi22UnhEyexa8xHUCmfm78lxCE8qGqcBzWK9DCy9E8GwhEmKfhEaV-2mi1igKq4FUgxaVUSum2-8wpo9UiyE9A2O19wCxe58ymEmxq3eUK1Nzo4O7bDmtcwcAu598GGbujhku4ozXqy9p6Gv8uKi58Wq2aU8FU8EyeF8yTJq-VuuUTum6UvDy4uQF9qBHUmKZfnS_rmVHWbFEGXF3AGFbAW81owio7y0So0zS27K8xsz9yX-7k7oi62cC3F0Pc8wn4-F8CcByBKh1q3gayxomkYwlxK14wKwU5mm0S8kxkk0sFw_w5hw997hFUx0gEeUdUep6e2w5C3e08sg0k9wrUqw2eUpwb_isgAvDglP0h892Dwo43Df9qyVY52wkR1m9y0x1Dzsbx28xa7VSCm8gKmcwaipm5o2P1nx3qaGAhEW54cqEnx2i099w1fazOK0jK0ybCrc260BE3TwcC0ahCwdG4VAbwai0bmw1Y-0a1wdG0yA0OS0JAu8g9ovwvWDwDwM-Eb9Q3K0Y8y1Tz40ru0wogg17UV1u05pU1vE4e0v6gK0yU2GxGt04hAba0XaU0h6c02nd3F-6dzErJxybGq1rwzwdK1o22gyForIS1WLo1Q8foy07ue4E6Qw0tZX-8mrtU0S60Fosw2QU3iWmmczo1lU5C0ke0kF1Wq04Ak061o2Gw2qoeoh4oxyGebUC8OzF2G4Q5ywkxkNAq8gKp07CGbw5Vo1Ro112rLx-68S28-FEC8wei0uC3K36i8w8y02u50Vg5KFA1wiAw",
                __hsdp:
                  "g2dJglIr3AIdgH2hc8gjMhORIRNCA8Se89GPb9ctFD9gxaJ96gZ1Ob6GijCzWu4MHVrkgj316qv3R-cQmGQmCD49RRtgz7OglRFHhHJbo84EW6U45fz4uf8ccq5oR7GaBJwxJdaq16xenF5W89B9t0Jx25HoQwkqykbzWK9U93DWCy9ojxul28hFlhu2GKfZySx2gKgx8f8rDz9pm8K48B5wJhh04K2G5kq2mAWwHwQwmUeoaGGWpjhgxbN0Yqeogx1d0wJwmA0W49g1x89oO1Ow7X80Xk09yg0s3w3xaAo2Aw0Ccw19O0eUwDw2ho0oew1oG",
                __hblp:
                  "1m1BxOi2O1bwp61ywNwzw9y48aUO4KEnwLwRDwG84EG0B8C1Lw9O3O9BwrE4S48gKvwOgjDAUcnh-FEym3K5XDwGxjK2uUy3N28hyUW4bx29g84bCBxa1GzFVE4zx63i0wF8-ezE9EizES7E-cKUa98Kp0gk0FE4yaK1Pz8Si2yq1Ojw-wyigG4omxmUqxiK3-4oe8O2q2eU6S15yUbUqz8Cdx26A786Cmq2totCCxCdx10xK2y1hxi5XDwjUaFU2-Cxu3q5EbEgwMgjzo3TwOxe2O1WwgV89VE4-1JwSyk1SyEKu2u18Cy8aE6i1AK6EiwJyU9V86u2a58fU_w8e5osyEy1ZxCdyoaoco5e69Ubu6o6qbAK1-wr8b8focUiwIwgogxC0HVopwNwCwxUc8rx25E-aw4KAwHxzzVoG3q36u1fS0PolDBG0zohwr8eEOHzoS2S4e2e2a4V8kDyEtwPCxi2Nt0Mxe6agmwDwayfwYUy0KQ5o-7UeUhAwLxKuawwG7o-7eagpgydwgQ5UvwiEkzU8oydz8iAyECt0i8KEy4ocoCcwUxe8U8EiAyKbDBzUqyqAK4ox2pXxSeDxmaCwAAU2mU-q1Xxy6U9o590UBDyU6KbyK2h1idAy8oDz8nKawPx116bxu2W2q13z8yQjdLbwJU9V83LyK1Oxidwgk2O786S6k3a5EbE5C3W1MU1gUbUkxCm2m368wGwkWwEy8jx2bwgpUsxnzQ2W2B7xe3a1liyo5e58SE423C6Eak8goyWxGnwzx63KbO5CXw",
                __sjsp:
                  "g2dJglIr3AIdgH2hIt2Q8ghORIRNCA8Se89GPb9ctFD9gxaJ96gZ1Ob6GijCzWu4MHVrkgj316qv3R-cQmGQmCD49RRtgz7OglRFHhHJbo84EW6U45fz4uf8ccq5oR7GayU8rjgC1qBWhuy2pingbogxqSd856EB2U-Hyu2gV-FEym2Kl28hFlhu2GKfZySx2gKgx8f8rDz9pm8K48B5wJhh04K2G5kq2mA3a3i1rwpaGWpjhgxbN0Yqeogx1d0wJwmA0W49g1x89oO1Ow7X80Xk09yg",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25331",
                lsd: "1MZj9eDbeloGgQHk3n-vVS",
                __spin_r: "1041410692",
                __spin_b: "trunk",
                __spin_t: "1781322141",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "useBillingAcknowledgeSoftTaxInfoMutation",
                variables:
                  '{"input":{"entry_point":"MBS_MV4B_LWS_ONBOARDING","payment_legacy_account_id":"' +
                  paymentAccountID +
                  '","upl_logging_data":{"context":"billingaccountinfo","entry_point":"mbs_mv4b_lws_onboarding","external_flow_id":"' +
                  external_flow_id +
                  '","target_name":"useBillingAcknowledgeSoftTaxInfoMutation","user_session_id":"' +
                  sessionid +
                  '","wizard_config_name":"BUSINESS_INFO_SUB","wizard_name":"ADD_PM","wizard_screen_name":"account_information_state_display","wizard_session_id":"' +
                  flowsessionid +
                  '"},"actor_id":"' +
                  uid +
                  '","client_mutation_id":"3"}}',
                server_timestamps: "true",
                doc_id: "24410015221998722",
              }),
            },
          );
          await response.json();
          console.log(response);

          headers["x-fb-friendly-name"] = "BillingWizardLandingScreenQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=35691",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6i",
                __hs: "20617.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041410692",
                __s: "5psvuv:5kfnrd:y7r5f3",
                __hsi: "7650720339752440893",
                __dyn:
                  "7xeUmxa2C6oCdwkECbwyyVp4Ub9o9E6u5aCG6UmCyE5W4UKewSAxam4Eco5S4Eaobo-dy8jwl8gwqoqxSdz8hw9-3a36HwQg9omwoU9FE4WqbwLghwLyaxBa2du3KbK3S0BoqgOUa8lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULxm3ydDxG1bwMzUkGvK68lwKG13y86qbxa4oO9wECyKbwzweau0Jo6-3u36i2G2B0wzFHwCxu6o9U4S7E6B0gEjADwOwuE6q7E5y2-1mwxwkU8888twZw-wRwQwhopoiwDwRw963i4oowlqwTwYx6mXDzoFo",
                __csr:
                  "g794Yl0Gh5jhI889OdjPh4hdsQDsAD5OEIlN34n9Ojhq5ih7iKGiqRbN5qkAJvFRbtMFRfilsJkQhWIDkHvRd-ZAbtZEHil4GBXW-WDamOpbAmAZAPXQyaF7uGhbq-HgVbRmCALRLWF6iAD_At6inmJnl999kGjt2aQP8CXgzCqOb_AACmrFR9OkjrlAKBrBKpyF4HQFBnhlCKjUOiaiQGA8GKm8XiUxGHJWhfyZRn-8W-ThrvxlGby4qiijWGFqBVe-Hy8CGhlmmZbiBnP2WAGpaHuCry9pExXgghoWnBzQiy58FGiZ4TVoG9Zebp4FJ2pAexaFARDiUizECbGmnDK4rzGBUPzQmECqueG5UN7DWxbxa4pF8yq48kqhrx2q2aaG2Ly49GuFUOGzEqjz898Oh0wxqm2vK_UJVojQi22UnhEyexa8xHUCmfm78lxCE8qGqcBzWK9DCy9E8GwhEmKfhEaV-2mi1igKq4FUgxaVUSum2-8wpo9UiyE9A2O19wCxe58ymEmxq3eUK1Nzo4O7bDmtcwcAu598GGbujhku4ozXqy9p6Gv8uKi58Wq2aU8FU8EyeF8yTJq-VuuUTum6UvDy4uQF9qBHUmKZfnS_rmVHWbFEGXF3AGFbAW81owio7y0So0zS27K8xsz9yX-7k7oi62cC3F0Pc8wn4-F8CcByBKh1q3gayxomkYwlxK14wKwU5mm0S8kxkk0sFw_w5hw997hFUx0gEeUdUep6e2w5C3e08sg0k9wrUqw2eUpwb_isgAvDglP0h892Dwo43Df9qyVY52wkR1m9y0x1Dzsbx28xa7VSCm8gKmcwaipm5o2P1nx3qaGAhEW54cqEnx2i099w1fazOK0jK0ybCrc260BE3TwcC0ahCwdG4VAbwai0bmw1Y-0a1wdG0yA0OS0JAu8g9ovwvWDwDwM-Eb9Q3K0Y8y1Tz40ru0wogg17UV1u05pU1vE4e0v6gK0yU2GxGt04hAba0XaU0h6c02nd3F-6dzErJxybGq1rwzwdK1o22gyForIS1WLo1Q8foy07ue4E6Qw0tZX-8mrtU0S60Fosw2QU3iWmmczo1lU5C0ke0kF1Wq04Ak061o2Gw2qoeoh4oxyGebUC8OzF2G4Q5ywkxkNAq8gKp07CGbw5Vo1Ro112rLx-68S28-FEC8wei0uC3K36i8w8y02u50Vg5KFA1wiAw",
                __hsdp:
                  "g2dJglIr3AIdgH2hc8gjMhORIRNCA8Se89GPb9ctFD9gxaJ96gZ1Ob6GijCzWu4MHVrkgj316qv3R-cQmGQmCD49RRtgz7OglRFHhHJbo84EW6U45fz4uf8ccq5oR7GaBJwxJdaq16xenF5W89B9t0Jx25HoQwkqykbzWK9U93DWCy9ojxul28hFlhu2GKfZySx2gKgx8f8rDz9pm8K48B5wJhh04K2G5kq2mAWwHwQwmUeoaGGWpjhgxbN0Yqeogx1d0wJwmA0W49g1x89oO1Ow7X80Xk09yg0s3w3xaAo2Aw0Ccw19O0eUwDw2ho0oew1oG",
                __hblp:
                  "1m1BxOi2O1bwp61ywNwzw9y48aUO4KEnwLwRDwG84EG0B8C1Lw9O3O9BwrE4S48gKvwOgjDAUcnh-FEym3K5XDwGxjK2uUy3N28hyUW4bx29g84bCBxa1GzFVE4zx63i0wF8-ezE9EizES7E-cKUa98Kp0gk0FE4yaK1Pz8Si2yq1Ojw-wyigG4omxmUqxiK3-4oe8O2q2eU6S15yUbUqz8Cdx26A786Cmq2totCCxCdx10xK2y1hxi5XDwjUaFU2-Cxu3q5EbEgwMgjzo3TwOxe2O1WwgV89VE4-1JwSyk1SyEKu2u18Cy8aE6i1AK6EiwJyU9V86u2a58fU_w8e5osyEy1ZxCdyoaoco5e69Ubu6o6qbAK1-wr8b8focUiwIwgogxC0HVopwNwCwxUc8rx25E-aw4KAwHxzzVoG3q36u1fS0PolDBG0zohwr8eEOHzoS2S4e2e2a4V8kDyEtwPCxi2Nt0Mxe6agmwDwayfwYUy0KQ5o-7UeUhAwLxKuawwG7o-7eagpgydwgQ5UvwiEkzU8oydz8iAyECt0i8KEy4ocoCcwUxe8U8EiAyKbDBzUqyqAK4ox2pXxSeDxmaCwAAU2mU-q1Xxy6U9o590UBDyU6KbyK2h1idAy8oDz8nKawPx116bxu2W2q13z8yQjdLbwJU9V83LyK1Oxidwgk2O786S6k3a5EbE5C3W1MU1gUbUkxCm2m368wGwkWwEy8jx2bwgpUsxnzQ2W2B7xe3a1liyo5e58SE423C6Eak8goyWxGnwzx63KbO5CXw",
                __sjsp:
                  "g2dJglIr3AIdgH2hIt2Q8ghORIRNCA8Se89GPb9ctFD9gxaJ96gZ1Ob6GijCzWu4MHVrkgj316qv3R-cQmGQmCD49RRtgz7OglRFHhHJbo84EW6U45fz4uf8ccq5oR7GayU8rjgC1qBWhuy2pingbogxqSd856EB2U-Hyu2gV-FEym2Kl28hFlhu2GKfZySx2gKgx8f8rDz9pm8K48B5wJhh04K2G5kq2mA3a3i1rwpaGWpjhgxbN0Yqeogx1d0wJwmA0W49g1x89oO1Ow7X80Xk09yg",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25331",
                lsd: "1MZj9eDbeloGgQHk3n-vVS",
                __spin_r: "1041410692",
                __spin_b: "trunk",
                __spin_t: "1781322141",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "BillingWizardLandingScreenQuery",
                variables: '{"paymentAccountID":"' + paymentAccountID + '"}',
                server_timestamps: "true",
                doc_id: "26244759078512251",
              }),
            },
          );
          await response.json();
          console.log(response);

          //xuat method id
          //code 2
          headers["x-fb-friendly-name"] = "BillingGKLogExposureMutation";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=35782",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6j",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "BillingGKLogExposureMutation",
                variables:
                  '{"input":{"gk_name":"MFT_USABILITY_FIXATHON_FLOW_9_1_HOLD_OUT","payment_legacy_account_id":"' +
                  paymentAccountID +
                  '","type":"PAYMENT_ACCOUNT_ID","actor_id":"' +
                  uid +
                  '","client_mutation_id":"5"}}',
                server_timestamps: "true",
                doc_id: "26662493080006863",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] = "BillingQELogExposureMutation";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=35782",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6k",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "BillingQELogExposureMutation",
                variables:
                  '{"input":{"param":"update_default","payment_legacy_account_id":"' +
                  paymentAccountID +
                  '","type":"PAYMENT_ACCOUNT","universe_name":"usability_flow107_t213933791","actor_id":"' +
                  uid +
                  '","client_mutation_id":"6"}}',
                server_timestamps: "true",
                doc_id: "24755584620725827",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] = "BillingQELogExposureMutation";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=35782",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6l",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "BillingQELogExposureMutation",
                variables:
                  '{"input":{"param":"enable","payment_legacy_account_id":"' +
                  paymentAccountID +
                  '","type":"PAYMENT_ACCOUNT","universe_name":"content_string_replacement_experiments","actor_id":"' +
                  uid +
                  '","client_mutation_id":"7"}}',
                server_timestamps: "true",
                doc_id: "24755584620725827",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] = "BillingQELogExposureMutation";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=35782",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6m",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "BillingQELogExposureMutation",
                variables:
                  '{"input":{"param":"dummy_param","payment_legacy_account_id":"' +
                  paymentAccountID +
                  '","type":"PAYMENT_ACCOUNT","universe_name":"wizard_preloading_refactor_add_pm__logging","actor_id":"' +
                  uid +
                  '","client_mutation_id":"8"}}',
                server_timestamps: "true",
                doc_id: "24755584620725827",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] = "BillingGKLogExposureMutation";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=35782",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6n",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "BillingGKLogExposureMutation",
                variables:
                  '{"input":{"gk_name":"MFT_NONREV_SHIPPING_GK_2026H1_AD_ACCOUNT_ID_V1","payment_legacy_account_id":"' +
                  paymentAccountID +
                  '","type":"PAYMENT_ACCOUNT_ID","actor_id":"' +
                  uid +
                  '","client_mutation_id":"9"}}',
                server_timestamps: "true",
                doc_id: "26662493080006863",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] =
            "BillingCheckCardRequirementsStateQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=35782",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6p",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "BillingCheckCardRequirementsStateQuery",
                variables:
                  '{"country":"' +
                  selected_country +
                  '","paymentMethodID":"unused value to satisfy graphQL and preloading checks","paymentAccountID":"' +
                  paymentAccountID +
                  '","intent":"ADD_PM","useBinInfosFromPaymentAccount":true}',
                server_timestamps: "true",
                doc_id: "26721501317443577",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] = "BillingAddCreditCardScreenQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=35782",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6q",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "BillingAddCreditCardScreenQuery",
                variables:
                  '{"paymentAccountID":"' +
                  paymentAccountID +
                  '","country":"' +
                  selected_country +
                  '","currency":"' +
                  currency +
                  '","intent":null}',
                server_timestamps: "true",
                doc_id: "36360602320204776",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] =
            "BillingVerifyCountrySelectDetectedLocationScreenQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=35782",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6r",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "BillingVerifyCountrySelectDetectedLocationScreenQuery",
                variables: '{"paymentAccountID":"' + paymentAccountID + '"}',
                server_timestamps: "true",
                doc_id: "31931308296513626",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] = "BillingCountryCurrencyScreenQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=35782",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6s",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "BillingCountryCurrencyScreenQuery",
                variables:
                  '{"paymentAccountID":"' +
                  paymentAccountID +
                  '","skipVerficationOptions":true}',
                server_timestamps: "true",
                doc_id: "31324011440577725",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] =
            "BillingCheckForRequiredAccountInformationStateQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=35782",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6u",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BusinessCometBizSuiteSettingsMV4BRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "BillingCheckForRequiredAccountInformationStateQuery",
                variables: '{"paymentAccountID":"' + paymentAccountID + '"}',
                server_timestamps: "true",
                doc_id: "25409069372031265",
              }),
            },
          );
          await response.json();

          // dien thong tin
          headers["x-fb-friendly-name"] =
            "useFBPAYAddressSuggestionsDataSourceQuery";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=38467",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6u",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BizWebCometMetaOneRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "useFBPAYAddressSuggestionsDataSourceQuery",
                variables:
                  '{"query_input":"Jl. Sudirman No. 12","country":"' +
                  selected_country +
                  '","session_id":"b10113ba-c1c7-4c97-ace1-b5d975690dce","scale":1,"upl_session_id":"upl_1789811906347_7afe4321-5ad9-452f-aa69-d19db29a4d7a","payment_product_id":null,"max_results":4,"payment_type":"BILLING"}',
                server_timestamps: "true",
                doc_id: "9674453219300189",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] = "BillingQELogExposureMutation";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=40298",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6u",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BizWebCometMetaOneRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "BillingQELogExposureMutation",
                variables:
                  '{"input":{"param":"enabled","payment_legacy_account_id":"' +
                  paymentAccountID +
                  '","universe_name":"attempt_to_fix_stale_wizard_queries_univser","actor_id":"' +
                  uid +
                  '","client_mutation_id":"8"}}',
                server_timestamps: "true",
                doc_id: "24755584620725827",
              }),
            },
          );
          await response.json();

          headers["x-fb-friendly-name"] =
            "BillingAccountInformationUtilsUpdateAccountMutation";
          response = await fetch(
            "https://business.facebook.com/api/graphql/?_callFlowletID=0&_triggerFlowletID=40298",
            {
              method: "POST",
              headers: headers,
              body: new URLSearchParams({
                av: uid,
                __aaid: "0",
                __bid: bm_id,
                __user: uid,
                __a: "1",
                __req: "6u",
                __hs: "20616.HYP:bizweb_comet_pkg.2.1...0",
                dpr: "1",
                __ccg: "EXCELLENT",
                __rev: "1041349847",
                __s: "6jw3m9:xfnff2:943o7i",
                __hsi: "7650443886810395518",
                __dyn:
                  "7xeUmxa2C6oCdwkEC8G6FUKmhe2Om2q1DxiFGxK5FEG1uDyUKewSAxamqbwNwnoiwFwJyF8S8xe1kx21FxG7oScx60DUcEcpEd42m5E6e2qq1eCyUbQ4obUyEpiwznwXyXwZw9m6AcKU98lwWxe4oeUa8465UScwuEnw8ScwgECu1vwywWAxCUkwv89k2CcAwOwAwRyQ6U-3K5E6a6S6UgyHxSi4p8aHwzzXwKwjohzpEjCx64oW2G261fwwxefyrwh8lxa1ozFULwjESu6E4K32fxiF-Uoxm2WE4e8wpEK4Ehz8C2yqaUK2e0UFU2RwrUdUcp8aEak22eCK2q5UpwDwjouwqk12xeiu3a1WwpEuwm8bU7y1jwwwwxS3S3W3m3i15xBxa2u3m0Aod8hxy1lG3u3O4prKudyBw",
                __csr:
                  "g7z2sRMhgR2ikRin6EykBSBd3cYJhdEQylL48bOP8AIqDb6QBkTAshOsIBl8x5TEB9j9tZV16ykinlmB8J994AsjqbuBurBmRBilqBtK_VkZbExmZrHiZkA98iETWFF9vQAQtf_yu_JahDVkJlAXyLnnbHqmLqhllbGFfJqiZ4ZuAjQjhlAFLHjCLLiJl-lb-y2GV8CheGAWIx4H8l2RQRGi9iACgx4hfBFox4VozqGqHCK8xeFbKK4Uyppbmh5QjDx2tdoOHL8ADZFp9d4-8AgDp-p4oWnJeeJ4yF6ihF9bRKQFHGEyQmnAhKaiykcy-SFoiiADz-GypFHDGiFFHxvz5xyp7G59-fK58W4ojAADF12iHAjDl6CCACy8x0CG6UyXyorxJomxrACyry8L8nxqbK8xe4FUJzk9wwx2uq79S4o-m7qx1omBDiJ12Q2e4rUlAwgotDwCHCxO8xu6Uyq3C4QqbG6UviVry8qpK6Xz8kyu4o8K8Ayo98K9xi1fwDg-q8zXx2m2i3t2UCi6Qfxa4o5u2CeV20hbhbQ4UC2uqt0KG8xzBwmJ2oSmmeExq8LKERqvo8V59GmviteaAXJ1bSECJayaAXZVkAQhGQmAA7qyXihfjqyt9aFKKFfASKXKSHZ4PmHi46BGbQiU8pGVojGit7Fd6VBmmtlp5qqAoriH9rCfcamqJHAyqyqG8Azt25KGQt5muq8JaCEnCDByAEoxOq9wIw2nA1Ew9iVqF02OQ2tby42e0mJ0em3S1Zwm5H42pqKaH9e2a2W3Gh9DBAiUW8mm17igkl3VrFU2cg4XodU8GIi9F0Kw5Hw34po0Fmi0kDhF4mlx4wvoB12q5gI1QwZIQgEis5awUxN1shPK2BTjC0ywbm0OWcm8Q4UIaMDxrrDhEy8hXDwjUKRgPxe3y0mKi0hh0a-cwiUm5o1BE2ZwDAaxu0ut0eDqqxd2EG3K0ky0Q80JvwtQbwfa2m08Mw1Jy0fSw42a3G7E3XxTwpEy8wbe1cwJyk1_zqwDxKbw7KCU08086K0na0QU3DDokAV9ik1Dwedw4vwczx2yzUak2O4k031W06gO122y0V206yCwpE08s80PO0vHgS2x4wCDlnG0rq04_8C0wYwS5Iw37wfd03hE09bA08S4ox2V20Tyusm0mx1Su08n8i4VFo0mkwAo2GS3TwwCzEgw-BwrU3GxSm6FiAy40tOA5E0qqx6mUn-3ScwUzpU6S0b2xdw",
                __hsdp:
                  "g2lE4s4h3OOs8EaRfsr4cj0DA4Vh1aHFGgSFAanKoAWO4CCFqGkwxkA8oQwgP4LWvqp0MJMG4fQ4aCgGmaMg0jQ-ThNbeT3BP9A4ib2CwGTh1bgcVKqAfw-ghWF3A5yGeccO5Gdoy48fEW2KqpkXQFF48e5Ujggh4Krh6qch8JK7VV215486oGha4Ai8l5G69UGu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bgyU4sMdU5eiEoHh2A8NgVejh3B6xFx-2peagmgng2QxO7AagN0tz05LwiE1Ni05Sg08FE0wQE0Km04so0jXw1620egwDw2ho0bw8",
                __hblp:
                  "1i1XKEqwGwbBwlUe8vwPwkUiy411G2e7EG9waDu5825w862y2C12xyawnEaE-dzKu7o9kaAVVqz45EhgOu7Z1Cay8ih8Dhqwwwkoeo4W2-6ok-8wjocVElwMDxy0E9o4G5Ef5x23iagO1ehodEe85ecxC6o8o849wh84-1jz4bwygswNwzzeewUx63G488Ef8uxPwlUy8wLwGwPzVU6C11xx0PzEyi78K4bxaEhzo5m6UvwyiwAxO36bzQ1awCwyw9W2CaKEtyU9pAE-2B0GxO2G1Vx61GDx61awe-2Ocz9onwjUGi2edwoo650QCxm12UgyEWaz8eE4O5Emwnm0Lob8mwjEC58bEK5o8VEeUC8wwKawg82awOy8lxm2m2-2S0E88oowAxWu2q4Eco7-26bg8o72eAzUS4VoG9wjU8U-3adxOmi1vw9e3G0Y8uAwm87-1-wvogxq789EKUS5V-1DhUxBxeiim4EqKdxe78984a5GU8o6i3KmbwjEx38c84Oi3idwZwwxucyVEsgyq12Cxy7U4eu5UgAxCq48K2SvG2K22EG4oC2u8z89EhxTwyxa4oih8-78KqEy9ypECEyi48oxufxKfCGm0BEG1Nzob8W9wmVUbUCU4C2-mUKcguGQ5oixG5povwzxubxa1hxe2a9wFui8u8F13ngG5898jwdi2q-1ULx3wXwiUC1tDxK2q4FEb86m2eEN0gUdqxq0Ro725Evy9oaoak0A8nxa9wxyUe9FUsxqaDxau4UaoGmewMwWzUixu1lggwhoy2W7Esy88ogDx2agW444Uf9YMhg-",
                __sjsp:
                  "g2lE4s4h3OOs8EaRfsqzJOMD1SgjB44GKCF3qCgFuVyjH8iqqBGFi25igxzi13ci_FZFA32T2Eg_ggGp2FoH101fjXt74IXsencCgh8Iaq2Ht44J0PCVGg-3V17GAegmaEUMP8mERy8gwjoaVFVHQFF8AUnxd114iVJ4pEN4ySUvDA84kgwpyF4Eih8xkmE88Gu44egmh9kkiQ9yS44i9g561Lg9A3uq5ob4Um8bg5gMdU5ei6WQgF2ckejAQgVhEqovwCjyA5A5Q0J8sxV2Acg7oM1rU4G0skw1tA",
                __comet_req: "11",
                fb_dtsg: fb_dtsg,
                jazoest: "25590",
                lsd: "MFwnop4xIgKkYPgCQPZVSt",
                __spin_r: "1041349847",
                __spin_b: "trunk",
                __spin_t: "1781257774",
                __jssesw: "1",
                __crn: "comet.bizweb.BizWebCometMetaOneRoute",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name:
                  "BillingAccountInformationUtilsUpdateAccountMutation",
                variables:
                  '{"input":{"billable_account_payment_legacy_account_id":"' +
                  paymentAccountID +
                  '","currency":"' +
                  currency +
                  '","device_country":"' +
                  selected_country +
                  '","tax":{"business_address":{"city":"Jakarta Selatan","country_code":"ID","state":"DKI Jakarta","street1":"Jl. Sudirman No. 12","street2":"","zip":"12920"},"business_name":"Toko Bangunan ABC","email":"","is_personal_use":false,"phone_number":"","second_tax_id":"","tax_id":"081785542123321","tax_registration_status":""},"timezone":null,"upl_logging_data":{"context":"billingaccountinfo","entry_point":"unknown","target_name":"BillingAccountInformationUtilsUpdateAccountMutation","user_session_id":"upl_1789811906347_7afe4321-5ad9-452f-aa69-d19db29a4d7a","wizard_config_name":"BUSINESS_INFO_SUB","wizard_name":"COLLECT_ACCOUNT_INFO","wizard_screen_name":"account_information_state_display","wizard_session_id":"upl_wizard_1789812895445_1cfbba55-0c82-4819-b097-49d24534ed8e"},"actor_id":"' +
                  uid +
                  '","client_mutation_id":"9"},"includeCreateNewFromOldFragment":false}',
                server_timestamps: "true",
                doc_id: "28163983213226133",
              }),
            },
          );
          await response.json();

          alert("Đã chạy thành công");
        } catch (error) {
          alert("Đã gặp lỗi: " + error.message + " " + error.stack);
        }
      });

    document.getElementById("btn-xoa-verify").addEventListener("click", () => {
      const targetElement = document.querySelector("body > span");
      if (targetElement) {
        targetElement.remove();
        console.log("Đã xóa thẻ body > span thành công!");
        alert("✅ Đã xóa thẻ Verify thành công!");
      } else {
        console.log("Không tìm thấy thẻ body > span trên trang này.");
        alert("⚠️ Không tìm thấy thẻ cần xóa trên trang này!", true);
      }
    });

    document
      .getElementById("btn-close-toolbar")
      .addEventListener("click", () => {
        toolbar.remove();
      });
  }

  // Khởi chạy khi trang đã tải xong
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    createToolbar();
  } else {
    document.addEventListener("DOMContentLoaded", createToolbar);
  }
})();
