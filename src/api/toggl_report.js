import { format, startOfMonth, endOfMonth, subMonths, getDaysInMonth, isWeekend, isSameDay } from 'date-fns';

function businessDaysInMonth(dateInMonth) {
  return Array.from({ length: getDaysInMonth(dateInMonth) }, (_, i) => i + 1)
    .filter(day => !isWeekend(new Date(dateInMonth.getFullYear(), dateInMonth.getMonth(), day)))
    .length;
}

function monthDateArray(dateInMonth) {
  return Array.from({ length: getDaysInMonth(dateInMonth) }, (_, i) => (
    new Date(dateInMonth.getFullYear(), dateInMonth.getMonth(), i + 1)
  ));
}

export function reportToBurndown({ token, workspaceId, projectId, hours, period }) {
  return getAllEntries(1, token, convertToParams({ workspaceId, projectId, period })).then(entries => {
    const goalInSeconds = (hours * 60 * 60);
    const totalExecutedSeconds = entries.map(entry => entry.dur / 1000).reduce((a, b) => a + b);
    const dateInMonth = getDateInMonth(period);
    const dailyGoalSeconds = Math.round(goalInSeconds / businessDaysInMonth(dateInMonth));
    const dailyData = monthDateArray(dateInMonth).map(date => {
      return {
        date: format(date, 'yyyy-MM-dd'),
        goal: isWeekend(date) ? 0 : dailyGoalSeconds,
        executed: entries.filter(entry => isSameDay(date, new Date(entry.start))).map(e => e.dur / 1000).reduce((a, b) => a + b, 0)
      }
    });
    const graphData = dailyData.map((data, index) => {
      return {
        ...data,
        idealSlope: dailyData.slice(0, index + 1).map(d => d.goal).reduce((a, b) => a - b, goalInSeconds),
        executedSlope: dailyData.slice(0, index + 1).map(d => d.executed).reduce((a, b) => a - b, goalInSeconds),
      }
    });
    return {
      goalInSeconds,
      totalExecutedSeconds,
      dateInMonth,
      dailyGoalSeconds,
      dailyData,
      graphData
    }
  });
}

function getAllEntries(currentPage, token, params) {
  const queryString = new URLSearchParams({ ...params, page: currentPage }).toString();
  return window.fetch(
    `https://toggl.com/reports/api/v2/details?${queryString}`,
    { method: 'GET', headers: headers(token) })
    .then(response => response.json()).then(responseData => {
      const totalObtained = ((currentPage - 1) * responseData.per_page) + responseData.data.length;
      if (totalObtained < responseData.total_count) {
        return getAllEntries(currentPage + 1, token, params).then(otherEntries => {
          return responseData.data.concat(otherEntries);
        });
      }
      return responseData.data;
    });
}

const headers = token => ({ Authorization: `Basic ${btoa(`${token}:api_token`)}` });

function convertToParams({ workspaceId, projectId, period }) {
  const { since, until } = convertPeriod(period);
  return {
    since,
    until,
    workspace_id: workspaceId,
    project_ids: projectId,
    user_agent: 'kkd-hrs'
  };
}

function getDateInMonth(period) {
  return subMonths(new Date(), parseInt(period, 10));
}

function convertPeriod(period) {
  const dateInMonth = getDateInMonth(period);
  const formatPattern = 'yyyy-MM-dd';
  return {
    since: format(startOfMonth(dateInMonth), formatPattern),
    until: format(endOfMonth(dateInMonth), formatPattern)
  }
}
