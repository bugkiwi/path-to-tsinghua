// 加载所有年级的月度计划
document.addEventListener('DOMContentLoaded', function() {
  // 导入所有年级的数据
  Promise.all([
    fetch('months/primary_school_year1.js').then(response => response.text()),
    fetch('months/primary_school_year2.js').then(response => response.text()),
    fetch('months/primary_school_year3.js').then(response => response.text()),
    fetch('months/primary_school_year4.js').then(response => response.text()),
    fetch('months/primary_school_year5.js').then(response => response.text()),
    fetch('months/primary_school_year6.js').then(response => response.text()),
    fetch('months/middle_school_year1.js').then(response => response.text()),
    fetch('months/middle_school_year2.js').then(response => response.text()),
    fetch('months/middle_school_year3.js').then(response => response.text()),
    fetch('months/high_school_year1.js').then(response => response.text()),
    fetch('months/high_school_year2.js').then(response => response.text()),
    fetch('months/high_school_year3.js').then(response => response.text())
  ]).then(scripts => {
    // 执行所有脚本以获取数据
    scripts.forEach(script => {
      eval(script);
    });

    // 合并所有月度计划
    const allMonths = [
      ...primarySchoolYear1,
      ...primarySchoolYear2,
      ...primarySchoolYear3,
      ...primarySchoolYear4,
      ...primarySchoolYear5,
      ...primarySchoolYear6,
      ...middleSchoolYear1,
      ...middleSchoolYear2,
      ...middleSchoolYear3,
      ...highSchoolYear1,
      ...highSchoolYear2,
      ...highSchoolYear3
    ];

    // 为每个月创建幻灯片
    const slidesContainer = document.querySelector('.slides');
    
    // 在目录页之后添加月度计划
    const monthSlides = allMonths.map(month => {
      return `
        <section class="monthly-slide">
          <h2 class="month-title">第${month.month}个月：${month.title}</h2>
          <div class="goals">
            <h3>月度目标：</h3>
            <ul>
              ${month.goals.map(goal => `<li>${goal}</li>`).join('')}
            </ul>
          </div>
          <div class="tasks">
            <h3>本月任务：</h3>
            <ul>
              ${month.tasks.map(task => `<li>${task}</li>`).join('')}
            </ul>
          </div>
          <div class="tips">
            <p>小贴士：${month.tips}</p>
          </div>
          <div class="progress-marker">
            <p>学习进度：${Math.round(month.month / 144 * 100)}%</p>
          </div>
        </section>
      `;
    }).join('');
    
    // 在现有的第二个部分（目录页）之后插入所有月份
    const catalogSection = document.querySelector('.slides section:nth-child(2)');
    catalogSection.insertAdjacentHTML('afterend', monthSlides);
    
    // 初始化 Reveal.js
    Reveal.initialize({
      center: true,
      hash: true,
      transition: 'slide',
      // 更多选项...
    });
  })
  .catch(error => {
    console.error('加载月度计划时出错:', error);
  });
});