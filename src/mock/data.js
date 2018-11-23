import Mock from 'mockjs';
import ls from '../utils/localStorage';

// Mock.Random 用来生成随机数据
const Random = Mock.Random;
const localArticles = ls.getItem('articles');
const localUser = ls.getItem('user');
const localUserName = localUser ? localUser : undefined;
let nextArticleId = 1;
