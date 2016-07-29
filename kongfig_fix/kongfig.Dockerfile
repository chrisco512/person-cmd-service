FROM node:6

RUN npm -g install kongfig

ADD ./kongfig_fix/config.yml ./config.yml
ADD ./kongfig_fix/kongfig_fix ./kongfig_fix

RUN chmod +x ./kongfig_fix

CMD ["./kongfig_fix"]
