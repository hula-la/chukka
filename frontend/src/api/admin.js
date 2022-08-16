import client from './client';

export const fetchUser = async () => {
  const res = await client.get('admin/accounts/');
  return res;
};

export const drop = async (data) => {
  const res = await client.delete(`admin/accounts/${data}/`);
  return res;
};

export const change = async ({ userId, userType }) => {
  const res = await client.put(`admin/accounts/${userId}/${userType}/`);
  return res;
};

export const fetchInst = async () => {
  const res = await client.get('admin/instructors/');
  return res;
};

export const insInfo = async (data) => {
  const res = await client.put('admin/instructors/', data);
  return res;
};

export const dropIns = async (insId) => {
  const res = await client.delete(`admin/instructors/${insId}`);
  return res;
};

export const picture = async (profileInsId, profile) => {
  const formData = new FormData();
  formData.append('profile', profile);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await client.put(
    `admin/instructors/${profileInsId}`,
    formData,
    config,
  );
  return res;
};

export const flectures = async () => {
  const res = await client.get('admin/lectures/');
  return res;
};

export const crlecture = async (lectureInfo, lecThumb) => {
  const formData = new FormData();
  formData.append('lecThumb', lecThumb);
  formData.append(
    'lectureInfo',
    new Blob([JSON.stringify(lectureInfo)], { type: 'application/json' }),
  );
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await client.post('admin/lectures/record', formData, config);
  return res;
};

export const cllecture = async (liveInfo, lecThumb) => {
  const formData = new FormData();
  formData.append('lecThumb', lecThumb);
  formData.append(
    'liveInfo',
    new Blob([JSON.stringify(liveInfo)], { type: 'application/json' }),
  );
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await client.post('admin/lectures/live', formData, config);
  return res;
};

export const dlecture = async (lecId) => {
  const res = await client.delete(`admin/lectures/${lecId}`);
  return res;
};

export const fsections = async (lecId) => {
  const res = await client.get(`admin/sections/${lecId}`);
  return res;
};

export const csection = async (lecId, contents, sectionInfo) => {
  const formData = new FormData();
  formData.append('contents', contents);
  formData.append(
    'sectionInfo',
    new Blob([JSON.stringify(sectionInfo)], { type: 'application/json' }),
  );
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await client.post(`admin/sections/${lecId}`, formData, config);
  return res;
};

export const dsection = async (lecId, sectionId) => {
  const res = await client.delete(`/admin/sections/${lecId}/${sectionId}`);
  return res;
};
